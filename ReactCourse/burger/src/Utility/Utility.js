//Utility.js


export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
}


//Function - createForm
//Description - 
    //translate reduced form array object into full form.
//Input Ex- 
    //contactForm = [
    //    {placeholder: 'Name', type:'input', validationRules:{required: true} },
    //    {placeholder: 'City', parent:'Address', type:'input', validationRules:{required: true} },
    //    {placeholder: 'Delivery', type:'select', 
    //        options: ['Fastest', 'Cheapest'], 
    //        validationRules:{required: true} }
    // ]
//Output Ex - 
    //{
    //   Name : {
    //      elementType : 'input',
    //      elementConfig : {
    //          type: 'text',
    //          placeholder : 'Name'
    //      },
    //      value : '',
    //      valid : true,
    //      touched : false,
    //      validationRules: {required: true}
    //   }
    //   Address : {
    //          City : { 
    //              elementType : 'input',
    //              elementConfig : {
    //                  type: 'text',
    //                  placeholder : 'City'
    //              },
    //              value : '',
    //              valid : true,
    //              touched : false,
    //              validationRules: {required: true}
    //          },
    //          isParent : true
    //  }
    //  Delivery : {
    //     elementType : 'select',
    //     elementConfig : {
    //         options: ['Fastest', 'Cheapest']
    //     },
    //     value : '',
    //     valid : true,
    //     touched : true,
    //     validationRules: {required: true}
    //  }
    //}
export const createForm = (formArray) => {
    let form = {}
    formArray.forEach( entry => {     
        
        let parent = form;   
        if(entry.parent){
            if( !form[entry.parent]){
                form[entry.parent] = {isParent:true}
            }

            parent = form[entry.parent]
        }

        switch(entry.type)
        {
            case 'input':
                parent[entry.placeholder] = {
                    elementType : 'input',
                    elementConfig : {
                        type: 'text',
                        placeholder : entry.placeholder
                    },
                    value : '',
                    valid : true,
                    touched : false,
                    validationRules: entry.validationRules
                }
                break;
            case 'select':
                parent[entry.placeholder] = {
                    elementType : 'select',
                    elementConfig : {
                        options: entry.options
                    },
                    value : '',
                    valid : true,
                    touched : true,
                    validationRules: entry.validationRules
                }
                break;
            default: break;
        }
    })

    return form;
}

//Function - formToInputElementArray
//Description -
    // convert form (from funciton above or in reducer state) to 
    // an array of InputElements, flattening out parents and giving
    // consistent values so it can be mapped to screen elements
//Input Ex -
    //{
    //   Name : {
    //      elementType : 'input',
    //      elementConfig : {
    //          type: 'text',
    //          placeholder : 'Name'
    //      },
    //      value : 'Bobert',
    //      valid : true,
    //      touched : false,
    //      validationRules: {required: true}
    //   }
    //   Address : {
    //          Zip : { 
    //              elementType : 'input',
    //              elementConfig : {
    //                  type: 'text',
    //                  placeholder : 'Zip'
    //              },
    //              value : '756',
    //              valid : false,
    //              touched : false,
    //              validationRules: {required: true, isZip:true}
    //          },
    //          isParent : true
    //  }
    //  Delivery : {
    //     elementType : 'select',
    //     elementConfig : {
    //         options: ['Fastest', 'Cheapest']
    //     },
    //     value : '',
    //     valid : true,
    //     touched : true,
    //     validationRules: {required: true}
    //  }
    //}
// Output Ex :
    // [
    //     {
    //         elementType : 'input',
    //         placeholder : 'Name',
    //         label : 'Name',
    //         options : null,
    //         value : 'Bobert',
    //         identifier : 'Name',
    //         valid : 'true'
    //     },
    //     {
    //         elementType : 'input',
    //         placeholder : 'Zip',
    //         label : 'Zip',
    //         options : null,
    //         value : '756',
    //         identifier : 'Address.Zip',
    //         valid : 'false'
    //     },
    //     {
    //         elementType : 'select',
    //         placeholder : 'Delivery',
    //         label : 'Delivery',
    //         options : ['Fastest', 'Cheapest'],
    //         value : 'Fastest',
    //         identifier : 'Delivery',
    //         valid : 'true'
    //     }
    // ]

export const formToInputElementArray = (form) => {
    let  identifier = ""
    let InputElements = [];
    for(let key in form)
    {
        identifier = key;
        let element= form[key]
        if(element.isParent)
        {
            for(let parentkey in element)
            {
                if(parentkey === 'isParent')
                    continue;

                let childElement = element[parentkey]
                let childIdentifier = identifier+'.'+parentkey

                InputElements.push(
                    {
                        elementType:childElement.elementType,
                        placeholder: childElement.elementConfig.placeholder,
                        label: childElement.elementConfig.placeholder,
                        options:childElement.elementConfig.options,
                        value:childElement.value,
                        identifier : childIdentifier,
                        valid: childElement.valid
                    })
            }
        }
        else
        {
            InputElements.push(
                {
                    elementType:element.elementType,
                    placeholder: element.elementConfig.placeholder,
                    label: element.elementConfig.placeholder,
                    options:element.elementConfig.options,
                    value:element.value,
                    identifier : identifier,
                    valid: element.valid
                })
        }
    }

    return InputElements;
}

export const UpdateFormElement = (formState, inputIdent, inputValue, inputValid) => {
  
    const updatedOrderForm = {...formState}


    let seperatedIdentifier = inputIdent.split('.')

    let elementCopy=updatedOrderForm
    for(let identifier in seperatedIdentifier)  {
        elementCopy = elementCopy[seperatedIdentifier[identifier]]
    }

    elementCopy.value = inputValue
    elementCopy.valid = inputValid
    elementCopy.touched = true

    let formValid = true;
    if(inputValid === false) {
        formValid = false

    }
    else{
        for(let key in updatedOrderForm)
        {
            if(!formValid)
            {
                break;
            }

            let element= updatedOrderForm[key]
            if(element.isParent)
            {
                
                for(let parentkey in element)
                {
                    if(parentkey === 'isParent')
                        continue;

                    let childElement = element[parentkey]
                    if(!childElement.valid || !childElement.touched) {
                        formValid = false
                        break;
                    }
                }
            }
            else
            {
                if(!element.valid || !element.touched)
                {
                    formValid = false
                    break;
                }
            }

        }
    }

    return [updatedOrderForm,formValid]
}