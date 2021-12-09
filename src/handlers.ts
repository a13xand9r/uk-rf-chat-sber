import { ScenarioHandler } from './types';
import * as dictionary from './system.i18n'
import { getArticle } from './api/articles';
require('dotenv').config()


export const runAppHandler: ScenarioHandler = ({ req, res }) => {
    const keyset = req.i18n(dictionary)
    const responseText = keyset('Привет')
    res.appendBubble(responseText)
    res.setPronounceText(responseText)
}

export const noMatchHandler: ScenarioHandler = async ({ req, res }) => {
    const keyset = req.i18n(dictionary)
    const responseText = keyset('404')
    res.appendBubble(responseText)
    res.setPronounceText(responseText)
}

export const getArticleHandler: ScenarioHandler = async ({ req, res }) => {
    console.log(req.variables)
    const { articleNumber } = req.variables

    if (articleNumber){
        const {articleTitle, articleParagraph} = await getArticle(Number(articleNumber))
        res.appendBubble(`${articleTitle}.\n${articleParagraph}`)
        res.setPronounceText(`${articleTitle}\n${articleParagraph}`)
    }

    // const keyset = req.i18n(dictionary)
    // const responseText = keyset('404')
    // res.appendBubble(responseText)
    // res.setPronounceText(responseText)
}