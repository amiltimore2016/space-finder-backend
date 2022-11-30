"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericTable = void 0;
const aws_dynamodb_1 = require("aws-cdk-lib/aws-dynamodb");
class GenericTable {
    constructor(stack, props) {
        this.props = props;
        this.stack = stack;
        this.initialize();
    }
    initialize() {
        this.createTable();
    }
    createTable() {
        this.table = new aws_dynamodb_1.Table(this.stack, this.props.tableName, {
            partitionKey: {
                name: this.props.primaryKey,
                type: aws_dynamodb_1.AttributeType.STRING
            },
            tableName: this.props.tableName
        });
    }
}
exports.GenericTable = GenericTable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VuZXJpdGNUYWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdlbmVyaXRjVGFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkRBQWdFO0FBUWhFLE1BQWEsWUFBWTtJQU1yQixZQUFtQixLQUFZLEVBQUUsS0FBaUI7UUFDOUMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFTyxVQUFVO1FBQ2QsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFTyxXQUFXO1FBQ2YsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLG9CQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTtZQUNyRCxZQUFZLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVTtnQkFDM0IsSUFBSSxFQUFFLDRCQUFhLENBQUMsTUFBTTthQUM3QjtZQUNELFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVM7U0FDbEMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUVKO0FBMUJELG9DQTBCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEF0dHJpYnV0ZVR5cGUsIFRhYmxlIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWR5bmFtb2RiJztcbmltcG9ydCB7IFN0YWNrIH0gZnJvbSAnYXdzLWNkay1saWInXG5cbmV4cG9ydCBpbnRlcmZhY2UgVGFibGVQcm9wcyB7XG4gICAgdGFibGVOYW1lOiBzdHJpbmcsXG4gICAgcHJpbWFyeUtleTogc3RyaW5nLFxufVxuXG5leHBvcnQgY2xhc3MgR2VuZXJpY1RhYmxlIHtcblxuICAgIHByaXZhdGUgc3RhY2s6IFN0YWNrO1xuICAgIHByaXZhdGUgdGFibGU6IFRhYmxlO1xuICAgIHByaXZhdGUgcHJvcHM6IFRhYmxlUHJvcHM7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3Ioc3RhY2s6IFN0YWNrLCBwcm9wczogVGFibGVQcm9wcykge1xuICAgICAgICB0aGlzLnByb3BzID0gcHJvcHM7XG4gICAgICAgIHRoaXMuc3RhY2sgPSBzdGFjaztcbiAgICAgICAgdGhpcy5pbml0aWFsaXplKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0aWFsaXplKCl7XG4gICAgICAgIHRoaXMuY3JlYXRlVGFibGUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZVRhYmxlKCl7XG4gICAgICAgIHRoaXMudGFibGUgPSBuZXcgVGFibGUodGhpcy5zdGFjaywgdGhpcy5wcm9wcy50YWJsZU5hbWUsIHtcbiAgICAgICAgICAgIHBhcnRpdGlvbktleToge1xuICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMucHJvcHMucHJpbWFyeUtleSxcbiAgICAgICAgICAgICAgICB0eXBlOiBBdHRyaWJ1dGVUeXBlLlNUUklOR1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRhYmxlTmFtZTogdGhpcy5wcm9wcy50YWJsZU5hbWVcbiAgICAgICAgfSk7XG4gICAgfVxuXG59Il19