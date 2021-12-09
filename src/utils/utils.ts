
export function getRandomFromArray<T>(arr: T[]): T {
    return arr[Math.floor(arr.length * Math.random())]
}

const ssmlObject = {
    'статью': 'статью\'',
    'а)': 'а.',
    'б)': 'б.',
    'в)': 'в.',
    'г)': 'г.',
    'е)': 'е.',
    'е.1)': 'е.1.',
    'ж)': 'ж.',
    'з)': 'з.',
    'и)': 'и.',
    'к)': 'к.',
    'л)': 'л.',
    'н)': 'н.',
}

export function addSSML(text: string): string {
    let keys: string[]
    let newText: string = text
    keys = Object.keys(ssmlObject)
    keys.forEach((key) => {
        if (newText.toLowerCase().includes(key.toLowerCase())) {
            //@ts-ignore
            newText = newText.replace(key, ssmlObject[key])
            //@ts-ignore
            newText = newText.replace(key.toLowerCase(), ssmlObject[key].toLowerCase())
        }
    })
    return `<speak>${newText}</speak>`
}
