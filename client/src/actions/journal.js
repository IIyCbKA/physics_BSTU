import { $host } from "../server_files/server_connect"

const GROUPS_ROUTE = '/api/groups'
const GROUP_STUDENTS_ROUTE = '/api/group_students'

export const getGroups = async () =>
{
    try {
        const response = await $host.get(GROUPS_ROUTE);

        return response.data.groups
    } catch (e) {
        console.log(e);
    }
};

export const getGroupStudents = async (groupID) =>
{
    try {
        const response = await $host.get(
            GROUP_STUDENTS_ROUTE, {params: {groupID}});

        return response.data.students
    } catch (e) {
        console.log(e);
    }
};