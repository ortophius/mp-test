import React, { useContext, useState } from "react";

import { observer } from "mobx-react-lite";
import { createTestLocation, storeContext, TestLocation } from "./store";
import { action, toJS } from "mobx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Select } from "./ui/select";
import { TextInput } from "./ui/text-input";

type TestLocationFormProps = {
  location: TestLocation;
  index?: number;
  onLocationRemove: () => void;
}


export default function App() {
  return (
    <div className="App">
      <TestLocationsList />
    </div>
  );
}

const TestLocationForm = observer(function TestLocationForm({ location, onLocationRemove, index = 0 }: TestLocationFormProps) {
  const store = useContext(storeContext);

  if (!store.isLoaded) {
    return <div>Данные не загружены</div>;
  }

  return <div className="location-form">
    <div className="location-form__header form-header">
      <FontAwesomeIcon icon="vial" size="2x" />
      <h2 className="form-header__title">Тестовая локация {index + 1}</h2>
      <button className="form-header__removeBtn" onClick={onLocationRemove}>
        <FontAwesomeIcon icon="trash-can" color="#e71414" />
      </button>
    </div>
    <div className="location-form__controls">
      <span className="location-form__label">
        Локация
      </span>
      <Select
        items={store.locations.map(location => ({ label: location.name, value: location.locationID }))}
        onChange={action((value: number) => location.locationID = value)}
        currentIndex={store.locations.findIndex((locationItem) => locationItem.locationID === location.locationID)}
        icon={<FontAwesomeIcon icon="location-dot" />}
        />
      <span className="location-form__label">
        Среда
      </span>
      <Select
        items={store.envs.map(env => ({ label: env.name, value: env.envID }))}
        onChange={action((value: number) => location.envID = value)}
        currentIndex={store.envs.findIndex((envItem) => envItem.envID === location.envID)}
        icon={<FontAwesomeIcon icon={{prefix: "fab", iconName: "envira"}} />}
      />
      <span className="location-form__label">
        Серверы:
      </span>
      <div className="location-form__servers">
        <FontAwesomeIcon icon="server" />
        <div className="location-form__server-list">
        {store
          .getServers(location.locationID, location.envID)
          .map(server => (server.name))
          .join(", ")
        }
        </div>
      </div>
      <span className="location-form__label">Подсказка</span>
      <div className="location-form__hint">
        <TextInput
          value={location.hint}
          onChange={action(({ target: { value }}) => { location.hint = value })}
          icon={<FontAwesomeIcon icon="question" />}  
        />
      </div>
    </div>
  </div>;
});

const TestLocationsList = () => {
  const store = useContext(storeContext);
  const [ locationsList, setTestLocationsList ] = useState([createTestLocation(store)])

  const handleRemoveLocation = (locationIndex: number) => {
    setTestLocationsList(locationsList.filter((_, index) => index !== locationIndex));
  }

  return (
    <div className="app">
      {locationsList.map((location, index) => (
        <TestLocationForm
          key={`location-${index}`}
          location={location}
          index={index}
          onLocationRemove={() => { handleRemoveLocation(index) }} />
      ))}
      <div className="app__buttons">
        <button
          className="app__button button"
          onClick={() => { setTestLocationsList([ ...locationsList, createTestLocation(store) ]) }}
        >
          <div className="button__icon">
            <FontAwesomeIcon icon="plus" />
          </div>
          Добавить тестовую локацию
        </button>
        <button
          className="app__button button"
          onClick={() => {
            console.log(locationsList.map(location => toJS(location)));
          }}
        >
          Вывести результат в консоль
        </button>
      </div>
    </div>
  );
};
