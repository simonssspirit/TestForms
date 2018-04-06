import React, {Component} from 'react'
import {Form, Field} from 'react-final-form'
import { Input, NumericTextBox, Switch } from '@progress/kendo-react-inputs'
import { DateInput } from '@progress/kendo-react-dateinputs'
import { DropDownList } from '@progress/kendo-react-dropdowns';

const onSubmit = async values => {
    window.alert(JSON.stringify(values, 0, 2))
}

class FinalForm extends Component {
    state = {departureCity:"", arrivalCity: "",numberOfPassengers: 1, departureDate: new Date(), arrivalDate: new Date(), class: "Economy", directFlight: false};

    onChangeDepartureCity = (event) => {
        this.setState({
            departureCity: event.value
        })
    }

    onChangeArrivalCity = (event) => {
        this.setState({
            arrivalCity: event.value
        })
    }

    onChangeDepartureDate = (event) => {
        this.setState({
            departureDate: event.value
        })
    }

    onChangeArrivalDate = (event) => {
        this.setState({
            arrivalDate: event.value
        })
    }

    KendoInput = ({ input, meta, ...rest }) => (
        <label className="k-form-field">
        <span>{rest.label}</span>
        <Input
          {...input}
          onChange={input.name === "departureCity" ? this.onChangeDepartureCity : this.onChangeArrivalCity }
          errortext={meta.touched ? meta.error : ''}
        />
        </label>
      )
    
      KendoNumericTextBox = ({ input, meta, ...rest }) => (
        <label className="k-form-field">
        <span>{rest.label}</span>
        <NumericTextBox
          {...input}
          onChange={(event) => this.setState({numberOfPassengers: event.value}) }
          errortext={meta.touched ? meta.error : ''}
        />
        </label>
      )

      KendoDatePicker = ({ input, meta, ...rest }) => (
        <label className="k-form-field">
        <span>{rest.label}</span>
        <DateInput
          {...input}
          onChange={input.name === "departureDate" ? this.onChangeDepartureDate : this.onChangeArrivalDate }
          errortext={meta.touched ? meta.error : ''}
        />
        </label>
      )

      KendoDropDown = ({ input, meta, ...rest }) => (
        <label className="k-form-field">
        <span>{rest.label}</span>
        <DropDownList
          {...input}
          data={["Economy", "Premium Economy", "Business", "First Class"]}
          onChange={(event) => this.setState({class: event.target.value}) }
          errortext={meta.touched ? meta.error : ''}
        />
        </label>
      )

      KendoSwitch= ({ input, meta, ...rest }) => (
        <label className="k-form-field">
        <span>{rest.label}</span>
        <Switch
          {...input}
          onChange={(event) => this.setState({directFlight: event.value}) }
          errortext={meta.touched ? meta.error : ''}
        />
        </label>
      )
    render() {
        return (
            <div>
                <Form
                    onSubmit={onSubmit}
                    initialValues={this.state}
                    render={({handleSubmit, reset, submitting, pristine, values}) => (
                    <form onSubmit={handleSubmit} className="k-form">
                    <fieldset>
                            <Field
                                name="departureCity"
                                label="Where from?"
                                component={this.KendoInput}/>
                            <Field
                                name="arrivalCity"
                                label="Where to?"
                                component={this.KendoInput}/>
                            <Field
                                name="numberOfPassengers"
                                component={this.KendoNumericTextBox}
                                label="Select the number of passengers?"/>
                        <Field
                            name="departureDate"
                            component={this.KendoDatePicker}
                            label="Departure date"/>
                            <Field
                            name="arrivalDate"
                            component={this.KendoDatePicker}
                            label="Arrival date"/>
                    <Field
                        name="class"
                        component={this.KendoDropDown}
                        label="Choose class"/>
                <Field
                    name="directFlight"
                    component={this.KendoSwitch}
                    label="Only direct flights"/>
                        <div className="buttons">
                            <button type="submit" className="k-button k-primary" disabled={submitting}>
                                Search flights
                            </button>
                            <button type="button" className="k-button" onClick={reset} disabled={submitting || pristine}>
                                Reset
                            </button>
                            </div>
                        </fieldset>
                    </form>
                )}/>
            </div>
        )
    }
}

export default FinalForm