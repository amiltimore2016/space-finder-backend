"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Delete_1 = require("../../services/SpacesTable/Delete");
const event = {
    queryStringParameters: {
        spaceId: '8f052ce4-95a3-42fd-b85c-bd80541fd02e'
    }
};
const result = (0, Delete_1.handler)(event, {}).then((apiResult) => {
    const items = JSON.parse(apiResult.body);
    console.log(123);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGVsbG8udGVzdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJIZWxsby50ZXN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDhEQUE0RDtBQUU1RCxNQUFNLEtBQUssR0FBeUI7SUFDbEMscUJBQXFCLEVBQUU7UUFDckIsT0FBTyxFQUFFLHNDQUFzQztLQUNoRDtDQUNLLENBQUM7QUFFVCxNQUFNLE1BQU0sR0FBRyxJQUFBLGdCQUFPLEVBQUMsS0FBSyxFQUFFLEVBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO0lBQ3hELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDcEIsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBUElHYXRld2F5UHJveHlFdmVudCB9IGZyb20gXCJhd3MtbGFtYmRhXCI7XG5pbXBvcnQgeyBoYW5kbGVyIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvU3BhY2VzVGFibGUvRGVsZXRlJztcblxuY29uc3QgZXZlbnQ6IEFQSUdhdGV3YXlQcm94eUV2ZW50ID0ge1xuICBxdWVyeVN0cmluZ1BhcmFtZXRlcnM6IHtcbiAgICBzcGFjZUlkOiAnOGYwNTJjZTQtOTVhMy00MmZkLWI4NWMtYmQ4MDU0MWZkMDJlJ1xuICB9XG59IGFzIGFueTtcblxuY29uc3QgcmVzdWx0ID0gaGFuZGxlcihldmVudCwge30gYXMgYW55KS50aGVuKChhcGlSZXN1bHQpID0+IHtcbiAgICBjb25zdCBpdGVtcyA9IEpTT04ucGFyc2UoYXBpUmVzdWx0LmJvZHkpO1xuICAgIGNvbnNvbGUubG9nKDEyMylcbn0pOyJdfQ==