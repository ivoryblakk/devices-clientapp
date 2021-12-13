import React, { useState, useEffect } from 'react';
import { useFetchDevices } from '../hooks/useFetchDevices';
import { appleSVG, windowsSVG, pencilSVG } from '../assets/Icons';
import { UpdateModalComponent } from '../Components/updateModal';
import { AddSystemModalComponent } from '../Components/addSystemModal';
import { Dropdown, Button } from 'react-bootstrap'
import Loader from 'react-loader-spinner';
import { sortBy } from 'lodash';

const MAC = 'MAC';
const HDD_CAPACITY = 'hdd_capacity'
const A_Z = 'a_z'

export const DeviceListComponent = () => {
    const [showModal, setShowModal] = useState(false);
    const [showAddSystemModal, setShowAddSystemModal] = useState(false);
    const { list, isLoading } = useFetchDevices();
    const [sortedDeviceList, setSortedDeviceList] = useState(list)
    const [deviceTypeSortList, setDeviceTypeSortList] = useState([]);
    const [HDDCapacitySortList, setHDDCapacitySortList] = useState([]);
    const [deviceNameSortBy, setDeviceNameSortBy] = useState('')
    const [deviceTypeSortBy, setDeviceTypeSortBy] = useState('');
    const [HDDCapacitySortBy, setHDDCapacitySortBy] = useState('');
    const [deviceDetails, setDeviceDetails] = useState({
        system_name: '',
        type: '',
        hdd_capacity: '',
        id: '',
    });
    const saveDeviceDetaiils = ({ system_name, type, hdd_capacity, id }) =>
        setDeviceDetails({ system_name, type, hdd_capacity, id });

    useEffect(() => {
        setDeviceTypeKeys();
        setHDDCapacityKeys();
    }, [list]);

    useEffect(() => {
        sortDevices();
    }, [deviceTypeSortBy, HDDCapacitySortBy, deviceNameSortBy]);

    const sortDevices = () => {
        let sortedList = list

        sortedList = deviceNameSortBy === A_Z ? sortBy(sortedList, (o) => o['system_name'].toLowerCase()) : list;

        if (deviceTypeSortBy) {
            sortedList = sortedList.filter((device) => device.type === deviceTypeSortBy)
        }
        if (HDDCapacitySortBy) {
            sortedList = sortedList.filter((device) => Number(device[HDD_CAPACITY]) === HDDCapacitySortBy)
        }

        setSortedDeviceList(sortedList)

    }
    const setDeviceTypeKeys = () => {
        const keys = list.map((device) => device.type);
        const noDuplicateKeys = keys.filter(
            (device, index) => keys.indexOf(device) === index
        );
        setDeviceTypeSortList(noDuplicateKeys);
    };

    const setHDDCapacityKeys = () => {
        const keys = list.map((device) => Number(device[HDD_CAPACITY]));
        const noDuplicateKeys = keys.filter(
            (device, index) => keys.indexOf(device) === index
        );
        const sortHDDCapacity = (a, b) => a - b
        setHDDCapacitySortList(noDuplicateKeys.sort(sortHDDCapacity));
    };

    const updateDeviceModal = (details) => {
        setShowModal(true);
        saveDeviceDetaiils(details);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const closeAddSystemModal = () => {
        setShowAddSystemModal(false);
    };

    const deviceDetailsDropDown = () => {
        const hasDeviceTypeSortList = (deviceTypeSortList.length > 1)

        return <Dropdown>
            <Dropdown.Toggle variant="" id="dropdown-basic">
                Sort by Type
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item eventKey="" onClick={() => setDeviceTypeSortBy('')} key={'all'} active={deviceTypeSortBy === ''}>All</Dropdown.Item>
                {hasDeviceTypeSortList && deviceTypeSortList.map((device, i) =>
                    <Dropdown.Item eventKey={device} onClick={() => setDeviceTypeSortBy(device)} key={device + i} active={deviceTypeSortBy == device}>{device}</Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>;

    }

    const hDDCapactityDropDown = () => {
        const hasHDDCapacitySortList = (HDDCapacitySortList.length > 1)

        return <Dropdown>
            <Dropdown.Toggle variant="" id="dropdown-basic">
                Sort by HDD Capacity
            </Dropdown.Toggle>
            <Dropdown.Menu >
                <Dropdown.Item eventKey='' onClick={() => setHDDCapacitySortBy('')} key={'all'} active={HDDCapacitySortBy === ''}>All</Dropdown.Item>
                {hasHDDCapacitySortList && HDDCapacitySortList.map((giga, i) =>
                    <Dropdown.Item eventKey={`${giga}`} onClick={() => setHDDCapacitySortBy(giga)} key={giga + i} active={HDDCapacitySortBy === giga}>{`${giga} GB`}</Dropdown.Item>

                )}
            </Dropdown.Menu>
        </Dropdown>;

    }

    const systemNameDropDown = () => {
        return <Dropdown>
            <Dropdown.Toggle variant="" id="dropdown-basic">
                Sort by System Name
            </Dropdown.Toggle>
            <Dropdown.Menu >
                <Dropdown.Item eventKey='' onClick={() => setDeviceNameSortBy('')} active={deviceNameSortBy === ''}>All</Dropdown.Item>
                <Dropdown.Item eventKey={A_Z} onClick={() => setDeviceNameSortBy(A_Z)} active={deviceNameSortBy === A_Z}>A-Z</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>;

    }


    const deviceDetailsHeader = () => {
        return (
            <div className="row">
                <div className="col-4">
                    <span>{systemNameDropDown()}  {deviceDetailsDropDown()}{hDDCapactityDropDown()} <Button onClick={()=>setShowAddSystemModal(true)}>Add System</Button></span>
                </div>
            </div>
        );
    };

    // console.log('deviceTypeSortList', deviceTypeSortList);
    // console.log('HDDCapacitySortList', HDDCapacitySortList);
    // console.log('deviceTypeSortBy', deviceTypeSortBy);
    // console.log('HDDCapacitySortBy', HDDCapacitySortBy);
    //console.log('sortedDeviceList', sortedDeviceList);

    return isLoading ? (
        <Loader type="TailSpin" color="#00BFFF" height={80} width={80} />
    ) : (
        <>
            {deviceDetailsHeader()}
            <div className="row">
                <div className="col-4">
                    {sortedDeviceList.length === 0 && !isLoading ? <div>
                        No Systems match your search criteria
                    </div> :
                        <ul>
                            {sortedDeviceList.map(({ system_name, type, hdd_capacity, id }) => (
                                <li className="p-2 m-1 border border-dark rounded" key={id}>
                                    <div className="row">
                                        <div className="col-10">
                                            <p className="m-0"> {`System Name: ${system_name}`}</p>
                                            <p className="m-0">
                                                Type: {type === MAC ? appleSVG : windowsSVG} {type}
                                            </p>
                                            <p className="m-0">{`HDD Capacity (GB): ${hdd_capacity} `}</p>
                                        </div>
                                        <div className="col-2">
                                            <button
                                                type="button"
                                                className="rounded-circle"
                                                onClick={() =>
                                                    updateDeviceModal({
                                                        system_name,
                                                        type,
                                                        hdd_capacity,
                                                        id,
                                                    })
                                                }
                                            >
                                                {pencilSVG}
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>}
                </div>
            </div>
            <UpdateModalComponent
                deviceDetails={deviceDetails}
                show={showModal}
                onHide={closeModal}
            />
            <AddSystemModalComponent
                show={showAddSystemModal}
                onHide={closeAddSystemModal}
            />
        </>
    );
};
