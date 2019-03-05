<template>
    <div class="invoice__insert">

        <div class="invoice__insert-line">
            <input
                v-model="input.name"
                @input="$v.input.name.$touch()"
                :class="{'invalid': $v.input.name.$error, 'valid': !$v.input.name.$error && $v.input.name.$model}"
                @keyup.enter="addInvoiceItem()"
                class="invoice__input"
                placeholder="Name"
                type="text"
            />
        </div>

        <div class="invoice__insert-line">
            <input
                v-model="input.quantity"
                @input="$v.input.quantity.$touch()"
                :class="{'invalid': $v.input.quantity.$error, 'valid': !$v.input.quantity.$error && $v.input.quantity.$model}"
                @keyup.enter="addInvoiceItem()"
                class="invoice__input"
                placeholder="Quantity"
                type="number"
                min="0"
            />
        </div>

        <div class="invoice__insert-line">
            <input
                v-model="input.price"
                @input="$v.input.price.$touch()"
                :class="{'invalid': $v.input.price.$error, 'valid': !$v.input.price.$error && $v.input.price.$model}"
                @keyup.enter="addInvoiceItem()"
                class="invoice__input"
                placeholder="Price"
                type="number"
                min="0"
            />
        </div>

        <div class="invoice__insert-line pt-15">
            <button class="btn btn-m btn-jungle btn-bold invoice__btn" @click="addInvoiceItem()">
                Add item
            </button>
        </div>

    </div>
</template>

<script>
    import { required } from 'vuelidate/lib/validators';

    import ClearParams from '../mixins/clear-params';

    import InvoiceItem from '../models/invoice-item';

    export default {
        name: "InvoiceInsert",
        data() {
            return {
                name: '',
                input: {
                    name: null,
                    quantity: null,
                    price: null
                }
            }
        },
        validations: {
            input: {
                name: {
                    required
                },
                quantity: {
                    required,
                    positive: value => value >= 0
                },
                price: {
                    required,
                    positive: value => value >= 0
                }
            }
        },
        mixins: [ ClearParams ],
        methods: {
            addInvoiceItem() {
                const { name, quantity, price } = this.input;
                let new_invoice_item;

                if ((!name || !quantity || !price) || this.$store.state.loading) return;

                if (!this.$v.input.quantity.$error && !this.$v.input.price.$error) {
                    new_invoice_item = new InvoiceItem(name, quantity, price);
                    this.$store.dispatch('addInvoiceItem', new_invoice_item).then(() => {
                        this.clearParams(this.input);
                        this.$v.$reset();
                    });
                }
            }
        },
    }
</script>

<style>
    .invoice__insert-line {
        margin-bottom: 20px;
    }
    .invoice__input {
        width: 100%;
        padding: 10px;
        border: none;
        border-bottom: 2px solid var(--color-gray);
    }
    .invoice__input.invalid {
        border-color: var(--color-red);
    }
    .invoice__input.valid {
        border-color: var(--color-green);
    }
    .invoice__input:focus {
        border-color: var(--color-jungle);
    }
    @media only screen and (max-width: 767px) {
        .invoice__input {
            font-size: 12px;
        }
    }
</style>