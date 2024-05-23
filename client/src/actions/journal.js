import {$host, SERVER} from "../server_files/server_connect"
import {setGroups, setTasks} from "../reducers/journal_reducer";
import { saveAs } from 'file-saver';
import {getFilenameOnly} from "./strings";

export const getGroups = () =>
    async (dispatch) => {
    try {
        const response = await $host.get('/api/groups');
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
            '/api/group_students', {params: {groupID}});

        return response.data.students
    } catch (e) {
        console.log(e);
    }
};

// Возвращает имена всех заданий
export const getTasksList = () =>
    async (dispatch) => {
        try {
            const response = await $host.get('/api/tasks/all');
            dispatch(setTasks(response.data));
        } catch (e) {
            console.log(e);
        }
    };

export const deleteTask = async (task_id) => {
    try{
        console.log(task_id)
        await $host.post('/api/tasks/delete', {taskID: task_id})
    }
    catch(e){
        console.log(e)
    }
}

// Возвращает информацию о задании
export const getTaskInfo = async () => {

}

export const processTask = async (task, route) => {
    try {
        const formData = new FormData();
        const additions_info = [];
        if (task.id)
            formData.append('id', task.id);
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
            if (addition.type === 'file' && !addition.remote) {
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

        return await $host.post(route, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    } catch (e) {
        console.log(e);
    }
}

// Добавляет задание
export const createTask = async (task) => {
    return await processTask(task, '/api/tasks/add')
}

export const downloadTaskFile = async (fileName, fileID) => {
    const url = `${SERVER}/api/journal/download/${fileID}`

    $host.get(url, {
        responseType: 'blob'
    }).then(response => {
        const blob = new Blob([response.data]);
        saveAs(blob, fileName);
    }).catch(e => console.log(e));
}

// Обновляет задание
export const updateTask = async (task) => {
    return await processTask(task, '/api/tasks/update')
}

export const getNextAdditionID = (additions) => {
    let maxID = 0;
    additions.forEach((addition) => {
        if (addition.id > maxID)
            maxID = addition.id
    })
    return maxID + 1;
}

export const convertRemoteAdditionsToEditFormat = (additions) => {
    const result = []
    additions.map(addition => {
        const name = addition.type === 'file' ?
            getFilenameOnly(addition.title) :
            addition.title
        return result.push({
            id: addition.id,
            type: addition.type,
            name,
            remote: true,
            content: addition.content
        })
    })
    return result
}

export const addWorkFile = async (file, task_id) => {
    try{
        const formData = new FormData()
        formData.append('file', file)
        formData.append('task_id', task_id)
        await $host.post('/api/works/add_file', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
    catch (e){
        console.log(e)
    }
}

export const deleteWorkFile = async (work_file_id) => {
    try{
        await $host.post('/api/works/delete_file', {work_file_id})
    }
    catch(e){
        console.log(e)
    }
}

export const handInWork = async (task_id) => {
    try{
        await $host.post('/api/works/handIn', {task_id})
    }
    catch(e){
        console.log(e)
    }
}

export const returnOwnWork = async (task_id) => {
    try{
        await $host.post('/api/works/return/student', {task_id})
    }
    catch(e){
        console.log(e)
    }
}
