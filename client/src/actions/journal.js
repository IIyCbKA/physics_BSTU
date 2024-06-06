import {$host, SERVER} from "../server_files/server_connect"
import {setGroups, setTasks} from "../reducers/journal_reducer";
import { saveAs } from 'file-saver';
import {getFilenameOnly} from "./strings";
import { setSelectedGroup } from "../reducers/selected_group_reducer";
import {socket} from "../server_files/sockets/socket_client"
import {
    ADDITION_TYPE_FILE,
    CREATE_TASK_URL,
    DELETE_TASK_URL,
    DELETE_WORK_FILE_URL,
    DOWNLOAD_TASK_FILE_PATTERN,
    GET_ALL_TASKS_URL,
    GET_GROUP_STUDENTS_URL,
    GET_GROUPS_URL, RETURN_STUDENT_WORK_URL,
    RETURN_OWN_WORK_URL,
    SUBMIT_WORK_URL,
    UPDATE_TASK_URL,
    UPLOAD_WORK_FILE_URL, SET_GRADE_URL, DOWNLOAD_WORK_FILE_PATTERN
} from "../constants";

export const getGroups = () =>
    async (dispatch) => {
    try {
        const response = await $host.get(GET_GROUPS_URL);
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

export const getGroupStudents = (groupID) =>
    async (dispatch) => {
    try {
        const response = await $host.get(
            GET_GROUP_STUDENTS_URL, {params: {groupID}});

        dispatch(setSelectedGroup(response.data))
        await socket.init('employee_group', {group_id: groupID})

        return response.data.students
    } catch (e) {
        console.log(e);
    }
};

// Возвращает имена всех заданий
export const getTasksList = () =>
    async (dispatch) => {
        try {
            const response = await $host.get(GET_ALL_TASKS_URL);
            dispatch(setTasks(response.data));
        } catch (e) {
            console.log(e);
        }
    };

export const deleteTask = async (task_id) => {
    try{
        const result = await $host.post(DELETE_TASK_URL, {taskID: task_id})
        return result.status
    }
    catch(e){
        return 500
    }
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
            if (addition.type === ADDITION_TYPE_FILE && !addition.remote) {
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
    try{
        const result = await processTask(task, CREATE_TASK_URL)
        return result.status
    }
    catch(e){
        return 500
    }
}

export const downloadTaskFile = async (fileName, fileID) => {
    const url = `${SERVER}${DOWNLOAD_TASK_FILE_PATTERN}${fileID}`

    $host.get(url, {
        responseType: 'blob'
    }).then(response => {
        const blob = new Blob([response.data]);
        saveAs(blob, fileName);
    }).catch(e => console.log(e));
}

// Обновляет задание
export const updateTask = async (task) => {
    try{
        const result = await processTask(task, UPDATE_TASK_URL)
        return result.status
    }
    catch(e){
        return 500
    }
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
        const name = addition.type === ADDITION_TYPE_FILE ?
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
        await $host.post(UPLOAD_WORK_FILE_URL, formData, {
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
        await $host.post(DELETE_WORK_FILE_URL, {work_file_id})
    }
    catch(e){
        console.log(e)
    }
}

export const handInWork = async (task_id) => {
    try{
        await $host.post(SUBMIT_WORK_URL, {task_id})
    }
    catch(e){
        console.log(e)
    }
}

export const returnOwnWork = async (task_id) => {
    try{
        await $host.post(RETURN_OWN_WORK_URL, {task_id})
    }
    catch(e){
        console.log(e)
    }
}

export const returnStudentWork = async (task_id, student_id) => {
    try{
        await $host.post(RETURN_STUDENT_WORK_URL, {task_id, student_id})
    }
    catch(e){
        console.log(e)
    }
}

export const setStudentGrade = async (task_id, student_id, grade) => {
    try{
        await $host.post(SET_GRADE_URL, {
            task_id, student_id, grade
        })
    }
    catch(e){
        console.log(e)
    }
}

export const downloadWorkFile = async (fileName, fileID) => {
    const url = `${SERVER}${DOWNLOAD_WORK_FILE_PATTERN}${fileID}`

    $host.get(url, {
        responseType: 'blob'
    }).then(response => {
        const blob = new Blob([response.data]);
        saveAs(blob, fileName);
    }).catch(e => console.log(e));
}
