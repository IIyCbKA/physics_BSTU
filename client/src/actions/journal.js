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
            value: group.id.toString()
        })
    })
    return options
}

export const getGroupStudents = async (groupID) => {
    try {
        const response = await $host.get(
            GROUP_STUDENTS_ROUTE, {params: {groupID}});

        return response.data.students
    } catch (e) {
        console.log(e);
    }
};

// Возвращает имена всех заданий
export const getTasksName = async () => {

}

// Возвращает информацию о задании
export const getTaskInfo = async () => {

}

// Добавляет задание
export const createTask = async (task) => {
    try {
        const formData = new FormData();
        const additions_info = [];
        formData.append('title', task.title);
        formData.append('description', task.description);
        formData.append('groups', task.groups);
        const files = task.additions;

        let index = 0;
        files.forEach((addition) => {
            const info = {
                id: addition.id,
                name: addition.name,
                type: addition.type,
                remote: addition.remote,
            };
            if (addition.type === 'file') {
                formData.append('files', addition.content.file);
                info.name = addition.content.file.name;
                info.fileIndex = index++;
            }
            else{
                info.fileIndex = -1;
            }
            additions_info.push(info)
        });

        formData.append('additions', JSON.stringify(additions_info));
        
        await $host.post('/api/tasks/add', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    } catch (e) {
        console.log(e);
    }
}

// Обновляет задание
// export const updateTask = async (task) => {
//
// }
