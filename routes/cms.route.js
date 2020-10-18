const { Router } = require('express')
const { check, body, validationResult } = require('express-validator')
const router = Router()

const {ContentPage, CONTENT_PAGE_STATUS_ACTIVE, CONTENT_PAGE_STATUS_DELETED, CONTENT_PAGE_ALLOWED_LANGUAGES} = require('../models/ContentPage')

// api/cms
router.get(
    '/',
    async (request, response) => {
        const pages = await ContentPage.find()

        response.status(200).json({ content: pages })
    }
)

router.get(
    '/allowed-languages',
    async (request, response) => {
        response.status(200).json(CONTENT_PAGE_ALLOWED_LANGUAGES)
    }
)


router.post(
    '/',
    [
        body('title', 'Title should not be empty').notEmpty(),
        body('slug', 'Slug should not be empty').notEmpty(),
        body('content', 'Content should not be empty').notEmpty(),
    ],
    async (request, response) => {

        const errors = validationResult(request)

        if (!errors.isEmpty()) {
            return response.status(400).json({
                errors: errors.array(),
            })
        }
        const { title, slug, content } = request.body
       
        const contentPage = new ContentPage({ title, slug, content, status: CONTENT_PAGE_STATUS_ACTIVE })

        contentPage.save().then(()=>{
            response.status(201).send()
        }).catch((e) => {
            response.status(409).json({ message: e})
        })
    }
)

router.get(
    '/:slug', 
    async (request, response) => {
        const slug = request.params.slug
        const contentPage = await ContentPage.findOne({slug})
        if (!contentPage) {
            return response.status(404).json({ message: 'Cannot find such page' })
        }

        return response.status(200).json(contentPage)
    }
)

router.put(
    '/:slug', 
    [
        body('title', 'Title should not be empty').notEmpty(),
        body('slug', 'Slug should not be empty').notEmpty(),
        body('content', 'Content should not be empty').notEmpty(),
    ],
    async (request, response) => {
        const errors = validationResult(request)

        if (!errors.isEmpty()) {
            return response.status(400).json({
                errors: errors.array(),
            })
        }
        const slug = request.params.slug
        const contentPage = await ContentPage.findOne({slug})

        if (!contentPage) {
            return response.status(404).json({ message: 'Cannot find such page' })
        }

        const { title, content, status } = request.body

        contentPage.title = title
        contentPage.status = status || CONTENT_PAGE_STATUS_ACTIVE

        for (let [key] of  contentPage.content) {
            if (content[key] === undefined) {
                contentPage.content.delete(key)
            }
        }

        contentPage.content = content
       
        contentPage.save().then(async ()=>{
            const contentPage2 = await ContentPage.findOne({slug})
            return response.status(200).json(contentPage2)
        }).catch((e) => {
            console.log(e)
            return response.status(409).json({ message: e})
        })
    }
)



module.exports = router