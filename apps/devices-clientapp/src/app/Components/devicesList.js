import React, { useState, useEffect } from 'react';
import { appleSVG, windowsSVG, pencilSVG } from '../assets/Icons';
import { UpdateModalComponent } from '../Components/updateModal';
import { AddSystemModalComponent } from '../Components/addSystemModal';
import { Dropdown, Button } from 'react-bootstrap'
import Loader from 'react-loader-spinner';
import { sortBy } from 'lodash';
import { parseTypeString } from '../utilites/utility';
import { useSelector, useDispatch } from 'react-redux'
import { fetchDevices, devicesListSelector } from './slice';

const MAC = 'MAC';
const HDD_CAPACITY = 'hdd_capacity'
const A_Z = 'a_z'
let deviceTypes = ['WINDOWS_WORKSTATION','WINDOWS_SERVER','MAC']

export const DeviceListComponent = () => {
    const dispatch = useDispatch()
    const devicesList = useSelector(devicesListSelector.selectAll)
    const { isFetching, error, addedDeviceDetails, updatedDevice, deletedDevice } = useSelector(state => state.devicesList)
    const [showModal, setShowModal] = useState(false);
    const [showAddSystemModal, setShowAddSystemModal] = useState(false);
    const [sortedDeviceList, setSortedDeviceList] = useState([])
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

    useEffect(() => {
        dispatch(fetchDevices())
    }, [dispatch, addedDeviceDetails, updatedDevice, deletedDevice])

    useEffect(() => {
        setDeviceTypeKeys();
        setHDDCapacityKeys();
    }, [devicesList]);

    useEffect(() => {
        sortDevices();
    }, [deviceTypeSortBy, HDDCapacitySortBy, deviceNameSortBy, sortedDeviceList, devicesList]);

    const saveDeviceDetails = ({ system_name, type, hdd_capacity, id }) =>
        setDeviceDetails({ system_name, type, hdd_capacity, id });

    const sortDevices = () => {
        let sortedList = devicesList

        sortedList = deviceNameSortBy === A_Z ? sortBy(sortedList, (o) => o['system_name'].toLowerCase()) : devicesList;

        if (deviceTypeSortBy) {
            sortedList = sortedList.filter((device) => device.type === deviceTypeSortBy)
        }
        if (HDDCapacitySortBy) {
            sortedList = sortedList.filter((device) => Number(device[HDD_CAPACITY]) === HDDCapacitySortBy)
        }

        setSortedDeviceList(sortedList)

    }

    const hasfilters = deviceTypeSortBy || deviceNameSortBy || HDDCapacitySortBy

    const setDeviceTypeKeys = () => {
         devicesList.map((device) => {
           deviceTypes.includes(device.type)? null: deviceTypes.push(device.type)
        });

        setDeviceTypeSortList(deviceTypes);
    };

    const setHDDCapacityKeys = () => {
        const keys = devicesList.map((device) => Number(device[HDD_CAPACITY]));
        const noDuplicateKeys = keys.filter(
            (device, index) => keys.indexOf(device) === index
        );
        const sortHDDCapacity = (a, b) => a - b
        setHDDCapacitySortList(noDuplicateKeys.sort(sortHDDCapacity));
    };

    const updateDeviceModal = (details) => {
        setShowModal(true);
        saveDeviceDetails(details);
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
            <Dropdown.Toggle variant="" id="dropdown-basic" className='text-light text-wrap'>
                Sort by Type
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item eventKey="" onClick={() => setDeviceTypeSortBy('')} key={'all'} active={deviceTypeSortBy === ''}>All</Dropdown.Item>
                {hasDeviceTypeSortList && deviceTypeSortList.map((device, i) =>
                    <Dropdown.Item eventKey={device} onClick={() => setDeviceTypeSortBy(device)} key={device + i} active={deviceTypeSortBy == device}>{parseTypeString(device)}</Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>;
    }

    const hDDCapactityDropDown = () => {
        const hasHDDCapacitySortList = (HDDCapacitySortList.length > 1)

        return <Dropdown>
            <Dropdown.Toggle variant="" id="dropdown-basic" className='text-light text-wrap'>
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
            <Dropdown.Toggle variant="" id="dropdown-basic" className='text-light text-wrap'>
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
            <div className="row ">
                <div className="col-7 bg-black p-2 ">
                    <div className="d-flex flex-row justify-content-between">{systemNameDropDown()}  {deviceDetailsDropDown()}{hDDCapactityDropDown()} <Button onClick={() => setShowAddSystemModal(true)}>Add System</Button></div>
                </div>
            </div>
        );
    };

    return isFetching ? (
        <div className="row">
            <div className="col-7 p-0 pt-5 d-flex justify-content-center">
                <Loader type="TailSpin" color="#00BFFF" height={80} width={80} />
            </div>
        </div>
    ) : error ? (<div className="row">
        <div className="col-7 p-0 pt-5 d-flex justify-content-center">
            Something went wrong
        </div>
    </div>) : (
        <>
            {deviceDetailsHeader()}
            <div className="row">
                <div className="col-7 p-0">
                    {sortedDeviceList.length === 0 && !isFetching && hasfilters  ? <div>
                        No Systems match your search criteria
                    </div>: sortedDeviceList.length === 0 && !isFetching? <div> 
                        There are no System Devices
                    </div> :
                        <ul className="p-0">
                            {sortedDeviceList.map(({ system_name, type, hdd_capacity, id }) => (
                                <li className="p-2 m-1 border shadow rounded" key={id}>
                                    <div className="row">
                                        <div className="col-10">
                                            <p className="m-0"> {`System Name: ${system_name}`}</p>
                                            <p className="m-0">
                                                Type: {type === MAC ? appleSVG : windowsSVG} {`${parseTypeString(type)}`}
                                            </p>
                                            <p className="m-0">{`HDD Capacity (GB): ${hdd_capacity} GB`}</p>
                                        </div>
                                        <div className="col-2 align-self-center mx-auto d-flex justify-content-end">
                                            <Button
                                                className="bg-white btn-light"
                                                onClick={() =>
                                                    updateDeviceModal({
                                                        system_name,
                                                        type,
                                                        hdd_capacity,
                                                        id,
                                                    })
                                                }>
                                                {pencilSVG}
                                            </Button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>}
                </div>
            </div>
            <UpdateModalComponent
                deviceDetails={deviceDetails}
                deviceTypeOptions={deviceTypeSortList}
                show={showModal}
                onHide={closeModal}
            />
            <AddSystemModalComponent
                deviceTypeOptions={deviceTypeSortList}
                show={showAddSystemModal}
                onHide={closeAddSystemModal}
            />
        </>
    );
};
