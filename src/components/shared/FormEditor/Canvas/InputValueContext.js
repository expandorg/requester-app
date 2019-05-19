import React, { createContext, Component, forwardRef } from 'react';
import PropTypes from 'prop-types';

export const InputValueContext = createContext();

export class InputValueContextProvider extends Component {
  static propTypes = {
    selection: PropTypes.shape({}),
  };

  static defaultProps = {
    selection: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      isValueEditable: false,
      moduleValue: undefined,
      selection: props.selection,
    };
  }

  static getDerivedStateFromProps({ selection }, state) {
    if (selection !== state.selection) {
      return {
        isValueEditable: false,
        moduleValue: undefined,
        selection,
      };
    }
    return null;
  }

  handleInputStart = () => {
    this.setState({
      isValueEditable: true,
      moduleValue: undefined,
    });
  };

  handleChange = (_, moduleValue) => {
    this.setState({ moduleValue });
  };

  render() {
    const { children } = this.props;
    const { isValueEditable, moduleValue } = this.state;

    const ctx = {
      isValueEditable,
      moduleValue,
      onChangeValue: this.handleChange,
      onStartInput: this.handleInputStart,
    };

    return (
      <InputValueContext.Provider value={ctx}>
        {children}
      </InputValueContext.Provider>
    );
  }
}

export const withInputValueContext = Wrapped =>
  // eslint-disable-next-line react/no-multi-comp
  forwardRef((props, ref) => (
    <InputValueContext.Consumer>
      {ctx => <Wrapped {...props} {...ctx} forwardedRef={ref} />}
    </InputValueContext.Consumer>
  ));
