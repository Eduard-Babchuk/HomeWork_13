const express = require('express')
const app = express()
const PORT = 3000

let contacts = {
    1: { id: '1', name: 'Bend', phone: '(555) 123-4567' },
    2: { id: '2', name: 'Amsterdam', phone: '(555) 987-6543' },
    3: { id: '3', name: 'Vietnam', phone: '(555) 456-7890' },
    4: { id: '4', name: 'Erihon', phone: '(555) 234-5678' },
    5: { id: '5', name: 'Los Angeles', phone: '(555) 876-5432' },
    6: { id: '6', name: 'Milan', phone: '(555) 345-6789' },
    7: { id: '7', name: 'Toronto', phone: '(555) 789-0123' }
}

app.use(express.json())

app.get('/contacts', (req, res) => {
    res.json(Object.values(contacts))
})

app.get('/contacts/:id', (req, res) => {
    const id = req.params.id
    const contact = contacts[id]
    if (!contact) {
        return res.status(404).json({ error: 'Contact not found' })
    }
    res.json(contact)
})

app.post('/contacts', (req, res) => {
    const lastId = Object.keys(contacts).length > 0 ? Math.max(...Object.keys(contacts)) : 0
    const newId = lastId + 1
    const newContact = {
        id: String(newId),
        name: req.body.name || undefined,
        phone: req.body.phone || undefined
    };
    contacts[newContact.id] = newContact
    res.status(201).json(newContact)
});

app.delete('/contacts/:id', (req, res) => {
    const id = req.params.id
    if (!contacts[id]) {
        return res.status(404).json({ error: 'Contact not found' })
    }
    delete contacts[id]
    res.sendStatus(204)
})

app.patch('/contacts/:id', (req, res) => {
    const id = req.params.id
    const updatedContact = req.body
    if (!contacts[id]) {
        return res.status(404).json({ error: 'Contact not found' })
    }
    contacts[id] = { ...contacts[id], ...updatedContact }
    res.json(contacts[id])
})

app.listen(PORT, () => {
    console.log(`Server is running: http://localhost:${PORT}/contacts`)
})