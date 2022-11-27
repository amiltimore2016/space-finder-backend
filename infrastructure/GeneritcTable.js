"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericTable = void 0;
const aws_dynamodb_1 = require("aws-cdk-lib/aws-dynamodb");
const aws_cdk_lib_1 = require("aws-cdk-lib");
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
            tableName: this.name,
            removalPolicy: aws_cdk_lib_1.RemovalPolicy.DESTROY
        });
    }
}
exports.GenericTable = GenericTable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VuZXJpdGNUYWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdlbmVyaXRjVGFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkRBQWdFO0FBQ2hFLDZDQUFrRDtBQUVsRCxNQUFhLFlBQVk7SUFRckIsWUFBbUIsSUFBWSxFQUFFLFVBQWtCLEVBQUUsS0FBWTtRQUM3RCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVPLFVBQVU7UUFDZCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUNPLFdBQVc7UUFDZixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksb0JBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDMUMsWUFBWSxFQUFFO2dCQUNWLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVTtnQkFDckIsSUFBSSxFQUFFLDRCQUFhLENBQUMsTUFBTTthQUM3QjtZQUNELFNBQVMsRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNwQixhQUFhLEVBQUUsMkJBQWEsQ0FBQyxPQUFPO1NBQ3ZDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FFSjtBQTdCRCxvQ0E2QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBdHRyaWJ1dGVUeXBlLCBUYWJsZSB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1keW5hbW9kYic7XG5pbXBvcnQgeyBSZW1vdmFsUG9saWN5LCBTdGFjayB9IGZyb20gJ2F3cy1jZGstbGliJ1xuXG5leHBvcnQgY2xhc3MgR2VuZXJpY1RhYmxlIHtcblxuICAgIHByaXZhdGUgbmFtZTogc3RyaW5nO1xuICAgIHByaXZhdGUgcHJpbWFyeUtleTogc3RyaW5nO1xuXG4gICAgcHJpdmF0ZSBzdGFjazogU3RhY2s7XG4gICAgcHJpdmF0ZSB0YWJsZTogVGFibGU7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBwcmltYXJ5S2V5OiBzdHJpbmcsIHN0YWNrOiBTdGFjaykge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLnByaW1hcnlLZXkgPSBwcmltYXJ5S2V5O1xuICAgICAgICB0aGlzLnN0YWNrID0gc3RhY2s7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdGlhbGl6ZSgpe1xuICAgICAgICB0aGlzLmNyZWF0ZVRhYmxlKCk7XG4gICAgfVxuICAgIHByaXZhdGUgY3JlYXRlVGFibGUoKXtcbiAgICAgICAgdGhpcy50YWJsZSA9IG5ldyBUYWJsZSh0aGlzLnN0YWNrLCB0aGlzLm5hbWUsIHtcbiAgICAgICAgICAgIHBhcnRpdGlvbktleToge1xuICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMucHJpbWFyeUtleSxcbiAgICAgICAgICAgICAgICB0eXBlOiBBdHRyaWJ1dGVUeXBlLlNUUklOR1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRhYmxlTmFtZTogdGhpcy5uYW1lLFxuICAgICAgICAgICAgcmVtb3ZhbFBvbGljeTogUmVtb3ZhbFBvbGljeS5ERVNUUk9ZXG4gICAgICAgIH0pO1xuICAgIH1cblxufSJdfQ==