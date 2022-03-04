"strict-mode"

const TASK_LIST = "TASKS"
const SORT_BY_DATE = "Sort_Date"
const SORT_BY_ALPHA ="Sort_Alphabetically"

const localTasks= localStorage.getItem(TASK_LIST)
let tasks= []

if(localTasks)
{
    tasks = JSON.parse(localTasks)
}
else
{
    localStorage.clear(TASK_LIST)
}

const filters = {
    searchText: '',
    hideCompleted: false,
    sortBy: "none"
}

const state = {
    selectionOn : false
}

const renderList = function () {

    libraryRenderList(tasks, filters, state)
}

document.getElementById("RemainingTasksText").innerText = tasks.length + " Remaining Tasks"
document.getElementById("TaskFilter").addEventListener("input", (e)=> filterList(e) )
document.getElementById("TaskButton").addEventListener("click", (e)=>addNoteHandler(e))
document.getElementById("filterCompleted").addEventListener('change', (e)=>{
    filters.hideCompleted =  e.target.checked
    renderList()
})
document.getElementById("SelectButton").addEventListener('click', (e)=> {
    state.selectionOn = !state.selectionOn
    renderList()
})
document.getElementById("")

renderList()



function checkBoxClicked(event)
{
    let node = event.target
    if(event.target.nodeName !== "LI"){
        node = node.parentElement
    }

    let task = tasks.filter((element) => {
        return element.title ===  node.children.label.innerText
    })

    if(task.length > 0)
    {
        task[0].completed = !task[0].completed
    }

    saveTasks(tasks)
    renderList()
}

function filterList(event)
{
    filters.searchText = event.target.value
    renderList()
}

function addNoteHandler(event)
{
    event.preventDefault()
    const noteBlock = document.getElementById('AddNoteBlock')
    const taskName = noteBlock.elements.TaskName.value.trim()
    tasks.push({title :taskName, 
                completed: false,
                time: new Date()})
    
    noteBlock.elements.TaskName.value  = ""

    saveTasks(tasks)
    renderList()

}

