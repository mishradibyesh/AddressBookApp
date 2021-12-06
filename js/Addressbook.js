window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const nameError = document.querySelector('.name-error');
    name.addEventListener('input', function() {
        let nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}$');
        if (nameRegex.test(name.value)) nameError.textContent = "";
        else nameError.textContent = "Name is Incorrect";
    });

    const phone = document.querySelector('#phone');
    const phoneError = document.querySelector('.phone-error');
    phone.addEventListener('input', function() {
        let phoneRegex = RegExp('^(?=.+)[0-9]{0,3}[0-9]{10}$');
        if (phoneRegex.test(phone.value)) phoneError.textContent = "";
        else phoneError.textContent = "Phone Number is Incorrect";
    });

    const address = document.querySelector('#address');
    const addressError = document.querySelector('.address-error');
    address.addEventListener('input', function() {
        let addressRegex = RegExp('.*');
        if (addressRegex.test(address.value)) addressError.textContent = "";
        else addressError.textContent = "Address is Incorrect";
    });

});

// save functionality of submit button defined 
const save = () => {
    try {
        let addressbookData = createAddressbook();
        createAndUpdateStorage(addressbookData);
    } catch (e) {
        return;
    }
}

const createAddressbook = () => {
    let addressbookData = new AddressbookData();
    try {
        addressbookData.name = getInputValueById('#name');
    } catch (e) {
        setTextValue('.text-error', e);
        throw e;
    }

    addressbookData.name = getInputValueById('#name');
    addressbookData.address = getInputValueById('#address');
    addressbookData.phone = getInputValueById('#phone');
    addressbookData.city = getInputValueById('#City');
    addressbookData._state = getInputValueById('#State');
    addressbookData.zip = getInputValueById('#ZipCode');

    alert(addressbookData.toString());
    return addressbookData;
}

const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach(item => {
        if (item.checked)
            selItems.push(item.value);
    });
    return selItems;
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

// saving the data into local storage
function createAndUpdateStorage(addressbookData) {
    let addressbookDataList = JSON.parse(localStorage.getItem("AddressbookDataList"));
    if (addressbookDataList != undefined) {
        addressbookDataList.push(addressbookData);
    } else {
        addressbookDataList = [addressbookData];
    }
    alert(addressbookDataList.toString());
    localStorage.setItem("AddressbookDataList", JSON.stringify(addressbookDataList));
}