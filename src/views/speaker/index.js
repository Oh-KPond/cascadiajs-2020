
let Layout = require('../layout')
let assetPath = 'https://create-4jr-staging.begin.app/_static/2020'

let Template = function(speaker) {
    const { key, name, location, company, /*url, twitter,*/ title, topics, pronouns, abstract } = speaker
    return /*html*/`
    <div id="page">
        <div id="page-title">
            <div>
                <h1>Speakers</h1>
            </div>
        </div>
        <div id="page-body">
            <section id="speaker">
                <h1>${ name }</h1>
                <div class="speaker-info">
                <div class="speaker-photo"><img src="${ assetPath }/${ key }.jpg" alt="photo of ${ name }"/></div>
                <div class="speaker-more">
                    <h3>Pronouns</h3>
                    <p>${ pronouns }</p>
                    <h3>Location</h3>
                    <p>${ location }</p>
                    <h3>Company</h3>
                    <p>${ company }</p>
                </div>
                </div>
                <h2>Talk: ${ title }</h2>
                <div class="topics">${ topics.map(t => `<div class=js-topic>${ t }</div>`).join('') }</div>
                <div class="abstract">${ abstract }</div>
            </section>
        </div>
    </div>
`
}

module.exports = async function Speaker(speaker) {
    let content = await Template(speaker)
    let socialUrl = `${ assetPath }/${ speaker.key }-social.png`
    let meta = `<meta property="og:image" content="${ socialUrl }" />
    <meta name="twitter:image" content="${ socialUrl }">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@cascadiajs">
    <meta name="twitter:title" content="CascadiaJS 2020 | ${ speaker.name } | ${ speaker.title }">`

    let html = await Layout({ content, meta })
    return { html }
}
