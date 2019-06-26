import { Customer } from './customer';

export class App {
    constructor() {
        this.heading = 'Customer Manager';
        /* This line gets the customers from local storage and displays them */
        this.customers = this.getCustomersFromStorage();

        this.customerName = '';
        this.customerEmai = '';
        this.customerPhone = '';
    }

    getCustomersFromStorage() {
        let customers;

        if(localStorage.getItem('customers') === null) {
            customers = [];
        } else {
            customers = JSON.parse(localStorage.getItem('customers'));
        }

        return customers;
    }

    addCustomer() {
        if(this.customerName && this.customerEmail && this.customerPhone) {
            this.customers.push(new Customer(this.customerName,
                this.customerEmail,
                this.customerPhone));

            /* This is where local storage is implemented
                Without this, as soon as you reload the page any data added will disappear */
            this.storeCustomer(this.customerName,
                this.customerEmail,
                this.customerPhone);

            // Clear Fields
            this.customerName = '';
            this.customerEmail = '';
            this.customerPhone = '';
        }
    }

    // Declare storeCustomer function
    storeCustomer(name, email, phone) {
        // Initialise customers variable
        let customers;

        // Check to see if there are any customers in local storage
        if(localStorage.getItem('customers') == null) {
            // If there are no customers, set the variable we create above to be an empty array
            customers = [];
        } else {
            /* Get whats in local storage using getItem
                Since everything stored in localStorage is a string, 
                it needs turning into an object using JSON.parse */
            customers = JSON.parse(localStorage.getItem('customers'));
        }

        /* Push in the new data */
        customers.push({name: name, email: email, phone: phone});

        /* When we get localStorage we parse it with JSON
            When we set localStorage we stringify it with JSON */
        localStorage.setItem('customers', JSON.stringify(customers));
    }

    removeCustomer(customer) {
        let index = this.customers.indexOf(customer);
        if(index !== -1) {
            /* index is the one we want to delete, 1 means we just want to delete one index) */
            this.customers.splice(index, 1);
        }

        this.removeCustomerFromStorage(index)
    }

    removeCustomerFromStorage(index) {
        let customers = JSON.parse(localStorage.getItem('customers'));

        customers.splice(index, 1)

        localStorage.setItem('customers', JSON.stringify(customers));
    }
}