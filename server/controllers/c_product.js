const {
    Product,
    Category,
    Pivot,
    Price,
    Preview,
    Stock } = require('../models')
const axios = require('axios')
const { get } = require('../routes/r_product')

module.exports = class ControllerProduct{
    static async addAuto(req, res, next) {
        const baseurl = "https://portal.panelo.co/paneloresto/api/productlist/18"
        try {
            const data_url = await axios.get(baseurl)
            data_url.data.products.forEach(async el_category => {
                const [data_category, created] = await Category.findOrCreate({
                    where: {
                        name: el_category.name
                    },
                    defaults: {
                      user_id: el_category.user_id
                    }
                })
                el_category.products.forEach(async el_product => {
                    const [data_product, product_created] = await Product.findOrCreate({
                        where: {
                            title: el_product.title
                        },
                        defaults: {
                            slug: el_product.slug,
                            lang: el_product.lang,
                            auth_id: el_product.auth_id,
                            status: el_product.status,
                            type: el_product.type,
                            count: el_product.count
                        }
                    })
                    console.log(data_product.id, typeof data_product.id);
                    if(product_created) {
                        await Pivot.create({
                            category_id: data_category.id,
                            term_id: data_product.id
                        })
                        await Price.create({
                            term_id: data_product.id,
                            price: el_product.price.price
                        })
                        await Preview.create({
                            term_id: data_product.id,
                            type: el_product.preview.type,
                            content: el_product.preview.content
                        })
                        await Stock.create({
                            term_id: data_product.id,
                            stock: el_product.stock.stock
                        })
                    }
                })
            })
            res.status(200).json({
                message: "Success"
            })
        } catch (err) {
            console.log(err);
        }
    }

    static async showAll(req, res, next) {
        try {
            const data = await Product.findAll({
                include: [
                    {
                        model: Category,
                        attributes: {
                            exclude: [ 'id', 'user_id', 'createdAt', 'updatedAt' ]
                        },
                        through: {
                            attributes: []
                        }
                    },
                    {
                        model: Price,
                        attributes: {
                            exclude: [ 'id', 'term_id', 'createdAt', 'updatedAt' ]
                        }
                    },
                    {
                        model: Preview,
                        attributes: {
                            exclude: [ 'id', 'term_id', 'createdAt', 'updatedAt' ]
                        }
                    },
                    {
                        model: Stock,
                        attributes: {
                            exclude: [ 'id', 'term_id', 'createdAt', 'updatedAt' ]
                        }
                    }
                ]
            })
            res.status(200).json({
                message: data
            })
        } catch (err) {
            console.log(err);
        }
    }

    static async showByCategory(req, res, next) {
        try {
            const getId = +req.params.category_id
            const data = await Product.findAll({
                include: [
                    {
                        model: Category,
                        where: {
                            id: getId
                        },
                        attributes: {
                            exclude: [ 'id', 'user_id', 'createdAt', 'updatedAt' ]
                        },
                        through: {
                            attributes: []
                        }
                    },
                    {
                        model: Price,
                        attributes: {
                            exclude: [ 'id', 'term_id', 'createdAt', 'updatedAt' ]
                        }
                    },
                    {
                        model: Preview,
                        attributes: {
                            exclude: [ 'id', 'term_id', 'createdAt', 'updatedAt' ]
                        }
                    },
                    {
                        model: Stock,
                        attributes: {
                            exclude: [ 'id', 'term_id', 'createdAt', 'updatedAt' ]
                        }
                    }
                ]
            })
            res.status(200).json({
                message: data
            })
        } catch (err) {
            console.log(err);
        }
    }

    static async showSelectedProduct(req, res, next) {
        try {
            const getId = +req.params.product_id
            const found = await Product.findByPk(getId)
            if(!found) {
                res.status(404).json({
                    message: "Data Not Found!"
                })
            } else {
                res.status(200).json(found)
            }
        } catch (err) {
            console.log(err);
        }
    }

    static async removeProduct(req, res, next) {
        try {
            const getId = +req.params.product_id
            const found = await Product.findByPk(getId)
            if(!found) {
                res.status(404).json({
                    message: "Data Not Found!"
                })
            } else {
                await Price.destroy({
                    where: {
                        term_id: getId
                    }
                })
                await Preview.destroy({
                    where: {
                        term_id: getId
                    }
                })
                await Stock.destroy({
                    where: {
                        term_id: getId
                    }
                })
                await Pivot.destroy({
                    where: {
                        term_id: getId
                    }
                })
                await Product.destroy({
                    where: {
                        id: getId
                    }
                })
                res.status(200).json({
                    message: "Success"
                })
            }
        } catch (err) {
            console.log(err);
        }
    }

    static async updateProduct(req, res, next) {
        try {
            const getId = +req.params.product_id
            const found = await Product.findByPk(getId)
            if(!found) {
                res.status(404).json({
                    message: "Data Not Found!"
                })
            } else {
                const { title, slug, lang, auth_id, status, type,
                    count, category_id, price, stock, t_preview, content } = req.body
                const newData = {
                    title: title,
                    slug: slug,
                    lang: lang,
                    auth_id: auth_id,
                    status: status,
                    type: type,
                    count: count
                }
                await Product.update(newData, {
                    where: { id: getId }
                })
                await Price.update({ price: price }, {
                    where: { term_id: getId }
                })
                await Pivot.update({ category_id: category_id }, {
                    where: { term_id: getId }
                })
                await Stock.update({ stock: stock }, {
                    where: { term_id: getId }
                })
                await Preview.update({
                    type: t_preview,
                    content: content
                },
                {
                    where: { term_id: getId }
                })
                res.status(200).json({
                    message: "Success"
                })
            }
        } catch (err) {
            console.log(err);
        }
    }
}