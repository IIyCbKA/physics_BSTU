import {$host, SERVER} from "../server_files/server_connect"
import {setGroups, setTasks} from "../reducers/journal_reducer";

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
            //if (response.data.tasks.length)
            //await deleteTask(response.data[0].id)
            dispatch(setTasks(response.data));
        } catch (e) {
            console.log(e);
        }
    };

export const deleteTask = async (task_id) => {
    try{
        await $host.post('/api/tasks/delete', {taskID: task_id})
    }
    catch(e){
        console.log(e)
    }
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
        
        return await $host.post('/api/tasks/add', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    } catch (e) {
        console.log(e);
    }
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
// export const updateTask = async (task) => {
//
// }
