export const shuffle = <T>(array:T[]):T[] =>{
    const result = [...array]
    let curIndex = result.length

    while (curIndex !== 0 ){
        const randIndex = Math.floor(Math.random() * curIndex)
        curIndex--
        const temp = result[curIndex]
        result[curIndex] = result[randIndex]
        result[randIndex] = temp
    }
    
    return result
}