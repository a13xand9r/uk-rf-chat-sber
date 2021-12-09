import axios from 'axios'

const getHTML = async () => {
    const {data} = await axios.get<string>('https://rg.ru/2007/11/12/ukrf-dok.html')
    // console.log(data)
    return data
}


export const getArticle = async (articleNumber: number) => {
    const html = await getHTML()

    const htmlRowsArray = html.split('\n')
    // console.log(htmlRowsArray.length)

    let articleTitle = ''
    let articleParagraph = ''
    let isArticleTitleFound = false
    let isArticleParagraphStart = false
    let paragraphLinesCount = 0

    for (let i = 0; i < htmlRowsArray.length; i++) {
        if (isArticleTitleFound && htmlRowsArray[i].includes(`<p`)){
            isArticleParagraphStart = true
        }
        if (isArticleParagraphStart){
            if (!htmlRowsArray[i].includes('(в ред.') && !htmlRowsArray[i].includes('(п.')) articleParagraph = articleParagraph + htmlRowsArray[i].replace(/[<>/bpr]/g, '') + '\n'
            if (htmlRowsArray[i].includes(`</p>`) && paragraphLinesCount > 0){
                isArticleParagraphStart = false
                break
            }
            paragraphLinesCount++
        }
        if (htmlRowsArray[i].includes(`<p><b>Статья ${articleNumber}.`)){
            // console.log(htmlRowsArray[i])
            articleTitle = htmlRowsArray[i].replace(/[<>/bpr]/g, '')
            isArticleTitleFound = true
        }
    }
    // console.log(articleTitle)
    // console.log(articleParagraph)
    return {
        articleTitle,
        articleParagraph
    }
}