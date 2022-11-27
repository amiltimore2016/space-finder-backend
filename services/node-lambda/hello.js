"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const uuid_1 = require("uuid");
async function handler(event, context) {
    return {
        statusCode: 200,
        body: 'Hello from lambda!' + (0, uuid_1.v4)()
    };
}
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVsbG8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJoZWxsby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBMEI7QUFFMUIsS0FBSyxVQUFVLE9BQU8sQ0FBQyxLQUFVLEVBQUUsT0FBWTtJQUMzQyxPQUFPO1FBQ0gsVUFBVSxFQUFFLEdBQUc7UUFDZixJQUFJLEVBQUUsb0JBQW9CLEdBQUcsSUFBQSxTQUFFLEdBQUU7S0FDcEMsQ0FBQTtBQUNMLENBQUM7QUFFUSwwQkFBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHY0IH0gZnJvbSAndXVpZCc7XG5cbmFzeW5jIGZ1bmN0aW9uIGhhbmRsZXIoZXZlbnQ6IGFueSwgY29udGV4dDogYW55KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICBib2R5OiAnSGVsbG8gZnJvbSBsYW1iZGEhJyArIHY0KClcbiAgICB9XG59XG5cbmV4cG9ydCB7IGhhbmRsZXIgfVxuIl19