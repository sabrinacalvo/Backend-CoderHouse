export let Contacts
switch (config.persistence) {
    case "MONGO":
        const connection = mongoose.connect('URL CONECTION MONGO')
        const {default:ContactsMongo} = await import('./')
        Contacts = ContactsMongo
        break;
    case "MEMORY":
        const {default:ContactsMemory} = await import('./')
        Contacts = ContactsMemory
        break;
}