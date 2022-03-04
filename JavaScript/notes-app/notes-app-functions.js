"strict-mode"



const libraryRenderList = function (taskList, listFilters, listState) {
    searchFilter = listFilters.searchText

    taskText = document.getElementById("RemainingTasksText")
    let remainingTaskCount = 0
    const listOfTasks = document.querySelector('ul')
    listOfTasks.innerHTML = ""

    taskList.forEach((element,index)=>{
        if(!element.completed)
        {
            remainingTaskCount++
        }

        if(!(searchFilter === ""  || element.title.toLowerCase().includes(searchFilter.toLowerCase())))
        {
            return
        }

        if(listFilters.hideCompleted && element.completed )
        {
            return
        }

        const listItem = document.createElement("li")
        const checkbox = document.createElement("INPUT")
        const itemLabel = document.createElement('label')
        const selectCheckbox = document.createElement("INPUT")

        checkbox.setAttribute("type", "checkbox")
        checkbox.setAttribute("id", "item"+index)
        checkbox.setAttribute("name", "checkBox")
        if(listState.selectionOn)
        {
            checkbox.setAttribute("disabled", "true")
        }
        checkbox.checked = element.completed
        listItem.appendChild(checkbox)
        
        itemLabel.setAttribute("id", "label"+index)
        itemLabel.setAttribute("name", "label")
        itemLabel.innerText = element.title
        itemLabel.setAttribute("for", "item"+index)
        if(listState.selectionOn)
        {
            itemLabel.style.color = "lightgrey"
            itemLabel.setAttribute("disabled", "true")
        }
        listItem.appendChild(itemLabel)

        if(state.selectionOn)
        {
            selectCheckbox.setAttribute("type", "checkbox")
            selectCheckbox.setAttribute("id", index)
            selectCheckbox.setAttribute("name", "deleteCheckBox")
            selectCheckbox.addEventListener('click', (e)=> {
                e.stopPropagation()
            })

            listItem.appendChild(selectCheckbox)
        }
        else
        {
            listItem.addEventListener("click", (e)=> checkBoxClicked(e))
        }
        listOfTasks.appendChild(listItem)
    }) 

    let selectButton = document.getElementById("SelectButton")
    let selectOptions = document.getElementById("SelectionOptions")
    selectOptions.innerHTML = ""

    if(listState.selectionOn)
    {
        selectButton.style.backgroundColor = "darkgreen"
        selectButton.style.color = "white"
        selectButton.style.borderWidth = "thin medium thin thin"
        selectButton.innerText = "Turn off Selection"

        const deleteButton = document.createElement("button")
        deleteButton.innerText = "Delete Selected"
        deleteButton.style.backgroundColor = "pink"
        deleteButton.style.borderRadius = "7px"
        deleteButton.style.outline = "none"
        selectOptions.appendChild(deleteButton)
        deleteButton.addEventListener("click", ()=>{
            deleteSelectedTasks()
            renderList(taskList, listFilters, listState)
        })
    }
    else{
        selectButton.style.backgroundColor = "lightGreen"
        selectButton.style.color = "black"
        selectButton.style.borderWidth = "thin thin thin thin"
        selectButton.innerText = "Turn on Selection"
    }

    taskText.innerText = remainingTaskCount + " Remaining Tasks" 
}

const sort = (sortBy) => {
    if(sortBy === "")
    {}
}

function saveTasks(taskList)
{
    localStorage.setItem(TASK_LIST, JSON.stringify(taskList))
}

function deleteSelectedTasks()
{
    let selections = document.getElementsByName('deleteCheckBox')
    let removed = 0;

    selections.forEach((element, index)=>{
        if(element.checked)
        {
            tasks.splice(index-removed,1)
            removed++
        }

    })

    localStorage.setItem(TASK_LIST, tasks)  
}