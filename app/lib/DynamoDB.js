var AWS = require('aws-sdk/dist/aws-sdk-react-native');

export default class AwsDynamoDb {
    static getItem(tableName, keys, attributes, callback) {
        var params = {};
        params.TableName = tableName;
        params.Key = {};
        params.ProjectionExpression = attributes;

        keys.forEach((value) => {
            params.Key[value.columnName] = {
                [value.type] : value.value
            }
        });

        this._runQuery(
            () => {
                (new AWS.DynamoDB()).getItem(params, (err, data) => this._queryCallback("getItem", callback, err, data));
            }
        )
    }

    static updateItem(tableName, keys, values, callback) {
        var params = {};
        params.TableName = tableName;
        params.Key = {};
        params.UpdateExpression = "SET ";
        params.ExpressionAttributeValues = {};

        keys.forEach((value) => {
            params.Key[value.columnName] = {
                [value.type] : value.value
            }
        });

        values.forEach((value, index, values) => {
            params.UpdateExpression += value.columnName + "=:" + value.columnName + (index === (values.length - 1) ? "" : ",");
            params.ExpressionAttributeValues[":" + value.columnName] = {
                [value.type] : value.value
            }
        });

        this._runQuery(
            () => {
                (new AWS.DynamoDB()).updateItem(params, (err, data) => this._queryCallback("updateItem", callback, err, data));
            }
        )
    };

    static _runQuery(toRun) {
        if(!AWS.config.credentials.expired) {
            toRun();
        } else {
            AWS.config.credentials.refresh((err) => {
                if(err) {
                    console.log('Error refresh identity token!');
                } else {
                    toRun();
                }
            });
        }
    }

    static _queryCallback(functionName, toCallback, err, data) {
        if (err) {
            console.log("Error in " + functionName, err);
        } else {
            console.log("Success in " + functionName, data);
            if(toCallback)
                toCallback(data);
        }
    }
}

