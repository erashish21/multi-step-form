import React, { Component } from "react";

class MultiStepForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      name: "",
      email: "",
      selection: "",
      validationErrors: {
        name: "",
        email: "",
        selection: "",
      },
    };
  }
  // Function to handle moving to the next step in the form
  handleNextStep = () => {
    const { step, name, email, selection, validationErrors } = this.state;

    if (step === 1) {
      // Validation for Step 1

      if (!name) {
        validationErrors.name = "Name is required.";
      } else {
        validationErrors.name = "";
      }

      if (!email) {
        validationErrors.email = "Email is required.";
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        validationErrors.email = "Invalid email format.";
      } else {
        validationErrors.email = "";
      }
    }

    if (step === 2) {
      // Validation for Step 2

      if (!selection) {
        validationErrors.selection = "Please make a selection.";
      } else {
        validationErrors.selection = "";
      }
    }

    // Check for any validation errors
    if (
      validationErrors.name ||
      validationErrors.email ||
      validationErrors.selection
    ) {
      this.setState({ validationErrors });
    } else {
      this.setState({ step: step + 1, validationErrors: {} });
    }
  };

  // Function to handle moving to the previous step in the form

  handlePreviousStep = () => {
    this.setState({ step: this.state.step - 1 });
  };

  // Function to handle input changes in the form fields
  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      validationErrors: {
        ...this.state.validationErrors,
        [event.target.name]: "",
      },
    });
  };

  render() {
    const { step, name, email, selection, validationErrors } = this.state;

    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
          {step === 1 && (
            <div>
              <h1 className="text-2xl mb-4">Step 1</h1>
              {/* Step 1: Name and Email input fields */}
              <div className="mb-4">
                <label className="block text-lg">Name</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={this.handleInputChange}
                  className="w-full border p-2 rounded focus:outline-none focus:ring focus:border-blue-400"
                />
                {validationErrors.name && (
                  <p className="text-red-600">{validationErrors.name}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-lg">Email</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={this.handleInputChange}
                  className="w-full border p-2 rounded focus:outline-none focus:ring focus:border-blue-400"
                />
                {validationErrors.email && (
                  <p className="text-red-600">{validationErrors.email}</p>
                )}
              </div>
            </div>
          )}
          {step === 2 && (
            <div>
              <h1 className="text-2xl mb-4">Step 2</h1>
              {/* Step 2: Selection dropdown */}
              <div className="mb-4">
                <label className="block text-lg">Selection</label>
                <select
                  name="selection"
                  value={selection}
                  onChange={this.handleInputChange}
                  className="w-full border p-2 rounded focus:outline-none focus:ring focus:border-blue-400"
                >
                  <option value="">-- Select One --</option>
                  <option value="IPhone 12">IPhone 12</option>
                  <option value="IPhone 13">IPhone 13</option>
                  <option value="IPhone 13 Plus">IPhone 13 Plus</option>
                  <option value="IPhone 14">IPhone 14</option>
                  <option value="IPhone 14 Pro">IPhone 14 Pro</option>
                </select>
                {validationErrors.selection && (
                  <p className="text-red-600">{validationErrors.selection}</p>
                )}
              </div>
            </div>
          )}
          <div className="flex justify-between">
            {step > 1 && (
              <button
                onClick={this.handlePreviousStep}
                className="border-2 border-yellow-600 rounded-lg px-3 py-2 text-yellow-400 cursor-pointer hover:bg-yellow-600 hover:text-yellow-200"
              >
                Previous
              </button>
            )}
            {step < 2 ? (
              <button
                onClick={this.handleNextStep}
                className="border-2 border-blue-600 rounded-lg px-3 py-2 text-blue-400 cursor-pointer hover:bg-blue-600 hover:text-blue-200"
              >
                Next
              </button>
            ) : (
              <button
                onClick={this.handleNextStep}
                className="border-2 border-green-600 rounded-lg px-3 py-2 text-green-400 cursor-pointer hover:bg-green-600 hover:text-green-200"
              >
                Confirm Order
              </button>
            )}
          </div>
          {step === 3 && (
            <div>
              <h1 className="text-2xl mb-4">Summary</h1>
              {/* Step 3: Display a summary of user inputs */}
              <p>Name: {name}</p>
              <p>Email: {email}</p>
              <p>Selection: {selection}</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default MultiStepForm;
