import React from 'react';
import ReactDOM from 'react-dom';
import { mount, configure, shallow } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';

import App from './App';
import SearchButton from './components/SearchButton';
import WeatherDisplay from './components/WeatherDisplay';

configure({ adapter: new Adapter() });

describe("App", () => {
  let props;
  let mountedApp;
  const app = () => {
    if (!mountedApp) {
      mountedApp = mount(<App />);
    }
    return mountedApp;
  };

  beforeEach(() => {
    mountedApp = undefined;
  });


  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("always renders a `SearchButton`", () => {
    expect(app().find(SearchButton).length).toBe(1);
  });

  it("doesn't render a `WeatherDisplay at first`", () => {
    expect(app().find(WeatherDisplay).length).toBe(0);
  });

  describe("`SearchButton`", () => {
    const searchButton = shallow(<SearchButton />);

    it("receives its props", () => {
      expect(Object.keys(searchButton.props()).length).toBe(2);
    });

    it("should display a message, if a search is done without text", () => {
      // fakeEvent was created to define preventDefault() in handleChange function
      const fakeEvent = { preventDefault: () => console.log("preventDefault") };
      expect(searchButton.find("Form").length).toBe(1);
      searchButton.find('Form').simulate('submit', fakeEvent);
      expect(searchButton.find('Message').length).toBe(1);
    });
  });

  describe("`WeatherDisplay`", () => {
    let wrapper;
    beforeEach(() => {
      const weatherData = {
        weather: 'Cloudy',
        city: 'Delhi',
        country: 'IN',
        temp: 10
      };
      const savedCities = ['Delhi'];
      const updateSavedCities = jest.fn();
      wrapper = mount(<WeatherDisplay weatherData={weatherData} savedCities={savedCities} callBackFromParent={updateSavedCities} />);
    });

    it("exists", () => {
      expect(wrapper.exists()).toBe(true);
    });

    it("receives its props", () => {
      expect(Object.keys(wrapper.props()).length).toBe(3);
    });
  });

});