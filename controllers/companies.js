const db = require("../config/db")
const fetch = require('node-fetch')

const getCompanies = async (req, res, next) => {
    try {
        const connection = await db.connect();
        const query = 'SELECT * FROM company;'
        const [rows] = await connection.query(query)
        if (rows.length === 0){
            res.status(404).json({
                message: "Not found",
                error: "Companies not found"
            })
            return
        }
        res.status(200).json({
            message:"Found",
            rows: rows
        })
        return
    } catch (e) {
        res.status(500).json({
            message: "Error on getting companies",
            error: e.message
        })
        return
    }
}

const createCompany = async (req, res, next) => {
    try{
        const {cnpj = null} = req.body
        if (!cnpj) {
            res.status(400).json({
                message: "Error on creating company",
                error: "No CNPJ in request"
            })
            return
        }

        const treatedCNPJ = cnpj.replace(/[^\d]+/g,'')
        const brasilAPIEndpoint = `https://brasilapi.com.br/api/cnpj/v1/${treatedCNPJ}`
        const fetchResponse = await fetch(brasilAPIEndpoint)
        const fetchResponseJSON = await fetchResponse.json()
        
        if (!fetchResponseJSON.cnpj) {
            res.status(400).json({
                message: "Error on creating company",
                error: "No such company registered in BrasilAPI"
            })
            return
        }

        const connection = await db.connect();
        const query = 'INSERT INTO company(cnpj, corporate_name, trading_name, city, state) VALUES (?, ?, ?, ?, ?);'
        const values = [fetchResponseJSON.cnpj, fetchResponseJSON.razao_social, fetchResponseJSON.nome_fantasia, fetchResponseJSON.municipio, fetchResponseJSON.uf]
        await connection.query(query, values)

        const select = 'SELECT * FROM company WHERE cnpj = ?'
        const selectValues = fetchResponseJSON.cnpj
        const [rows] = await connection.query(select, selectValues)
        
        res.status(201).json({
            message: "Created",
            rows: rows
        })
        return
    } catch (e) {
        res.status(500).json({
            message: "Error on creation",
            error: e.message
        })
        return
    }
}

const editCompany = async (req, res, next) => {
    try{
        const {cnpj = null} = req.params
        if (!cnpj) {
            res.status(400).json({
                message: "Error on editing company",
                error: "No CNPJ in request"
            })
            return
        }

        const treatedCNPJ = cnpj.replace(/[^\d]+/g,'')
        const brasilAPIEndpoint = `https://brasilapi.com.br/api/cnpj/v1/${treatedCNPJ}`
        const fetchResponse = await fetch(brasilAPIEndpoint)
        const fetchResponseJSON = await fetchResponse.json()

        if (!fetchResponseJSON.cnpj) {
            res.status(400).json({
                message: "Error on editing company",
                error: "No such company registered in BrasilAPI"
            })
            return
        }

        const connection = await db.connect();
        const query = 'UPDATE company SET corporate_name = ?, trading_name = ?, city = ?, state = ? WHERE cnpj = ?'
        const values = [fetchResponseJSON.razao_social, fetchResponseJSON.nome_fantasia, fetchResponseJSON.municipio, fetchResponseJSON.uf, fetchResponseJSON.cnpj]
        await connection.query(query, values)

        const select = 'SELECT * FROM company WHERE cnpj = ?'
        const selectValues = fetchResponseJSON.cnpj
        const [rows] = await connection.query(select, selectValues)

        res.status(201).json({
            message: "Updated",
            rows: rows
        })
        return

    } catch (e) {
        res.status(500).json({
            message: "Error on editing",
            error: e.message
        })
        return 
    }
}

const deleteCompany =  async(req, res, next) => {
    try {
        const {cnpj = null} = req.params
        if (!cnpj) {
            res.status(400).json({
                message: "Error on deleting company",
                error: "No CNPJ in request"
            })
            return
        }
        
        const connection = await db.connect();
        const select = 'SELECT * FROM company WHERE cnpj = ?'
        const treatedCNPJ = cnpj.replace(/[^\d]+/g,'')
        const values = [treatedCNPJ]
        const [rows] = await connection.query(select, values)
        if (rows.length === 0){
            res.status(404).json({
                message: "Not found",
                error: "Companies not found"
            })
            return
        }

        const query = 'DELETE FROM company WHERE cnpj = ?'
        await connection.query(query, values)

        res.status(204).json()
        return
    } catch (e) {
        res.status(500).json({
            message: "Error on deleting",
            error: e.message
        })
        return 
    }
}

module.exports = {
    getCompanies,
    createCompany,
    editCompany,
    deleteCompany
}