"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericTable = void 0;
const aws_dynamodb_1 = require("aws-cdk-lib/aws-dynamodb");
class GenericTable {
    constructor(name, primaryKey, stack) {
        this.name = name;
        this.primaryKey = primaryKey;
        this.stack = stack;
        this.initialize();
    }
    initialize() {
        this.createTable();
    }
    createTable() {
        this.table = new aws_dynamodb_1.Table(this.stack, this.name, {
            partitionKey: {
                name: this.primaryKey,
                type: aws_dynamodb_1.AttributeType.STRING
            },
            tableName: this.name
        });
    }
}
exports.GenericTable = GenericTable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VuZXJpdGNUYWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdlbmVyaXRjVGFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkRBQWdFO0FBR2hFLE1BQWEsWUFBWTtJQVFyQixZQUFtQixJQUFZLEVBQUUsVUFBa0IsRUFBRSxLQUFZO1FBQzdELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRU8sVUFBVTtRQUNkLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBQ08sV0FBVztRQUNmLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxvQkFBSyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRTtZQUMxQyxZQUFZLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVO2dCQUNyQixJQUFJLEVBQUUsNEJBQWEsQ0FBQyxNQUFNO2FBQzdCO1lBQ0QsU0FBUyxFQUFFLElBQUksQ0FBQyxJQUFJO1NBQ3ZCLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FFSjtBQTVCRCxvQ0E0QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBdHRyaWJ1dGVUeXBlLCBUYWJsZSB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1keW5hbW9kYic7XG5pbXBvcnQgeyBTdGFjayB9IGZyb20gJ2F3cy1jZGstbGliJ1xuXG5leHBvcnQgY2xhc3MgR2VuZXJpY1RhYmxlIHtcblxuICAgIHByaXZhdGUgbmFtZTogc3RyaW5nO1xuICAgIHByaXZhdGUgcHJpbWFyeUtleTogc3RyaW5nO1xuXG4gICAgcHJpdmF0ZSBzdGFjazogU3RhY2s7XG4gICAgcHJpdmF0ZSB0YWJsZTogVGFibGU7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBwcmltYXJ5S2V5OiBzdHJpbmcsIHN0YWNrOiBTdGFjaykge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLnByaW1hcnlLZXkgPSBwcmltYXJ5S2V5O1xuICAgICAgICB0aGlzLnN0YWNrID0gc3RhY2s7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdGlhbGl6ZSgpe1xuICAgICAgICB0aGlzLmNyZWF0ZVRhYmxlKCk7XG4gICAgfVxuICAgIHByaXZhdGUgY3JlYXRlVGFibGUoKXtcbiAgICAgICAgdGhpcy50YWJsZSA9IG5ldyBUYWJsZSh0aGlzLnN0YWNrLCB0aGlzLm5hbWUsIHtcbiAgICAgICAgICAgIHBhcnRpdGlvbktleToge1xuICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMucHJpbWFyeUtleSxcbiAgICAgICAgICAgICAgICB0eXBlOiBBdHRyaWJ1dGVUeXBlLlNUUklOR1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRhYmxlTmFtZTogdGhpcy5uYW1lXG4gICAgICAgIH0pO1xuICAgIH1cblxufSJdfQ==