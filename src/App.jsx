import React from 'react';

import './scss/main.scss';

const ipList = [
  {
    uuid: 'uuid-1',
    address: '0.0.0.0',
    mask: '0',
    gateway: '193.0.174.1',
    interface: 'Подключение Ethernet',
  },
  {
    uuid: 'uuid-2',
    address: '192.168.1.0',
    mask: '24',
    gateway: '192.168.1.1',
    interface: 'Гостевая сеть',
  },
  {
    uuid: 'uuid-3',
    address: '10.0.0.0',
    mask: '8',
    gateway: '10.0.0.1',
    interface: 'Домашняя сеть',
  },
  {
    uuid: 'uuid-4',
    address: '172.16.0.0',
    mask: '16',
    gateway: '172.16.0.1',
    interface: 'Подключение Ethernet',
  },
  {
    uuid: 'uuid-5',
    address: '192.168.10.0',
    mask: '24',
    gateway: '192.168.10.1',
    interface: 'Гостевая сеть',
  },
  {
    uuid: 'uuid-6',
    address: '10.10.10.0',
    mask: '24',
    gateway: '10.10.10.1',
    interface: 'Домашняя сеть',
  },
  {
    uuid: 'uuid-7',
    address: '0.0.0.0',
    mask: '0',
    gateway: '193.0.175.1',
    interface: 'Подключение Ethernet',
  },
  {
    uuid: 'uuid-8',
    address: '192.168.100.0',
    mask: '24',
    gateway: '192.168.100.1',
    interface: 'Гостевая сеть',
  },
];

function App() {
  const [sortProperty, setSortProperty] = React.useState({
    order: 'asc',
    by: 'address',
  });

  const sortedList = [...ipList].sort((a, b) => {
    if (sortProperty.by === 'interface') {
      if (sortProperty.order === 'asc') {
        return a.interface.localeCompare(b.interface);
      } else {
        return b.interface.localeCompare(a.interface);
      }
    } else {
      const partsA =
        sortProperty.by === 'address'
          ? a.address.split('.').map(Number)
          : a.gateway.split('.').map(Number);
      const partsB =
        sortProperty.by === 'address'
          ? b.address.split('.').map(Number)
          : b.gateway.split('.').map(Number);

      for (let i = 0; i < 4; i++) {
        if (partsA[i] !== partsB[i]) {
          return sortProperty.order === 'asc' ? partsA[i] - partsB[i] : partsB[i] - partsA[i];
        }
      }
      return 0;
    }
  });

  const handleClick = (by) => {
    if (by !== sortProperty.by) {
      setSortProperty({
        order: 'asc',
        by,
      });
    } else {
      setSortProperty((prev) => ({
        order: prev.order === 'asc' ? 'desc' : 'asc',
        by,
      }));
    }
  };

  const ipElements = sortedList.map((obj) => (
    <tr key={obj.uuid}>
      <td>{`${obj.address}/${obj.mask}`}</td>
      <td>{obj.gateway}</td>
      <td>{obj.interface}</td>
    </tr>
  ));

  return (
    <div className="app">
      <div className="routes">
        <h4>Действующие маршруты IPv4</h4>
        <table>
          <thead>
            <tr>
              <th onClick={() => handleClick('address')}>
                <div className="header-cell">
                  Адрес назначения
                  {sortProperty.by === 'address' &&
                    (sortProperty.order === 'asc' ? <span>▲</span> : <span>▼</span>)}
                </div>
              </th>
              <th onClick={() => handleClick('gateway')}>
                <div className="header-cell">
                  Шлюз
                  {sortProperty.by === 'gateway' &&
                    (sortProperty.order === 'asc' ? <span>▲</span> : <span>▼</span>)}
                </div>
              </th>
              <th onClick={() => handleClick('interface')}>
                <div className="header-cell">
                  Интерфейс
                  {sortProperty.by === 'interface' &&
                    (sortProperty.order === 'asc' ? <span>▲</span> : <span>▼</span>)}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>{ipElements}</tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
