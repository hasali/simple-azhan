export const shuffle = <T>(array:T[]):T[] =>{
    const result = [...array]
    let curIndex = result.length

    while (curIndex !== 0 ){
        const randIndex = Math.floor(Math.random() * curIndex)
        curIndex--
        [result[curIndex], result[randIndex]] = [result[randIndex], result[curIndex]]
    }
    
    return result
}