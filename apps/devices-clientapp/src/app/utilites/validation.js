
export const validateDeviceInput= (values )=>{
    const errors = {};
    const {system_name, type, hdd_capacity }= values
    const isNotAWholeNumber = !Number.isInteger(hdd_capacity)
    const doesNotStartWithLetter =  !/^[a-zA-Z]+$/gm.test(system_name.slice(0, 1))

    if(!system_name){
      errors.system_name = 'Required'
    }
    if((!/^[a-zA-Z-]+$/gm.test(system_name)|| doesNotStartWithLetter )&& system_name){
      errors.system_name = 'Please use Letters and/or hypens ex: MY-COMPUTER'
    }
    if(!type){
      errors.type = 'Required'
    }
    if(!hdd_capacity){
      errors.hdd_capacity = 'Required'
    }

    if( (1 > hdd_capacity || isNotAWholeNumber ) ){
      console.log('hdd_capacity: ', hdd_capacity)
      errors.hdd_capacity = 'Please use a Valid Whole Number'
    }

    return errors
}