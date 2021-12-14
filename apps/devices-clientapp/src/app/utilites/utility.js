import { capitalize } from 'lodash';

export const parseTypeString = (string) => {
    const spiltString = string.split('_')
    let  capitalizeStrings = spiltString.map((word)=> capitalize(word))
         capitalizeStrings = capitalizeStrings.join(' ');
         return capitalizeStrings;
}
