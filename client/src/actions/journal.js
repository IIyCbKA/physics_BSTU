import { $host } from "../server_files/server_connect"
import {setGroups} from "../reducers/journal_reducer";

const GROUPS_ROUTE = '/api/groups'
const GROUP_STUDENTS_ROUTE = '/api/group_students'

export const getGroups = () =>
    async (dispatch) => {
    try {
        const response = await $host.get(GROUPS_ROUTE);
        dispatch(setGroups(response.data.groups));
    } catch (e) {
        console.log(e);
    }
};

export const getGroupsOptions = (groups) => {
    const options = []
    groups.map(group => {
        return options.push({
            key: group.id,
            label: group.name,
            value: group.id
        })
    })
    return options
}

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
