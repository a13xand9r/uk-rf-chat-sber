import { ScenarioHandler } from './types';
import * as dictionary from './system.i18n'
import { getArticle } from './api/articles';
require('dotenv').config()


export const runAppHandler: ScenarioHandler = ({ req, res }) => {
    const keyset = req.i18n(dictionary)
    const responseText = keyset('Привет')
    res.appendBubble(responseText)
    res.setPronounceText(responseText)
    res.appendSuggestions(['Статья 1', 'Статья 240', '310'])
}

export const noMatchHandler: ScenarioHandler = async ({ req, res }) => {
    const keyset = req.i18n(dictionary)
    const responseText = keyset('404')
    res.appendBubble(responseText)
    res.setPronounceText(responseText)
    res.appendSuggestions(['Статья 3', 'Статья 160', '330'])
}

export const getArticleHandler: ScenarioHandler = async ({ req, res }) => {
    console.log(req.variables)
    const { articleNumber } = req.variables

    if (articleNumber){
        const {articleTitle, articleParagraph} = await getArticle(Number(articleNumber))
        if (articleTitle !== ''){
            res.appendBubble(`${articleTitle}.\n${articleParagraph}`)
            res.setPronounceText(`${articleTitle}\n${articleParagraph}`)
        } else {
            res.appendBubble(`К сожалению не могу найти такую статью`)
            res.setPronounceText(`К сожалению не могу найти такую статью`)
        }
    }

    res.appendSuggestions(['Статья 2', 'Статья 110', '220'])

    // const keyset = req.i18n(dictionary)
    // const responseText = keyset('404')
    // res.appendBubble(responseText)
    // res.setPronounceText(responseText)
}