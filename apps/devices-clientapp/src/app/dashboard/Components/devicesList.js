import React, { useState, useEffect } from 'react';
import { appleSVG, windowsSVG, pencilSVG } from '../../assets/Icons';
import { SystemListModalComponent } from '../Components/systemListModal';
import { Dropdown, Button } from 'react-bootstrap'
import Loader from 'react-loader-spinner';
import { sortBy } from 'lodash';
import { parseTypeString } from '../../utilites/utility';
import { useSelector, useDispatch } from 'react-redux'
import { fetchDevices, devicesListSelector } from './slice';

export const MAC = 'MAC';
export const SYSTEM_NAME = 'system_name'
export const HDD_CAPACITY = 'hdd_capacity'
export const TYPE = 'type'
export const initialDeviceDetails = {
    system_name: '',
    type: '',
    hdd_capacity: '',
    id: '',
}

const A_Z = 'a_z'
let deviceTypes = ['WINDOWS_WORKSTATION', 'WINDOWS_SERVER', 'MAC']


export const DeviceListComponent = () => {
    const dispatch = useDispatch()
    const devicesList = useSelector(devicesListSelector.selectAll)
    const { isFetching, error, addedDeviceDetails, updatedDevice, deletedDevice } = useSelector(state => state.devicesList)
    const [showModal, setShowModal] = useState(false);
    const [isEditModal, setIsEditModal] = useState(false);
    const [sortedDeviceList, setSortedDeviceList] = useState([])
    const [typeSortList, setTypeSortList] = useState([]);
    const [HDDCapacitySortList, setHDDCapacitySortList] = useState([]);
    const [sortByName, setSortByName] = useState('')
    const [sortByType, setSortByType] = useState('');
    const [sortByHDDCapacity, setSortByHDDCapacity] = useState('');
    const [deviceDetails, setDeviceDetails] = useState(initialDeviceDetails);

    useEffect(() => {
        dispatch(fetchDevices())
    }, [dispatch, addedDeviceDetails, updatedDevice, deletedDevice])

    useEffect(() => {
        setDeviceTypeKeys();
        setHDDCapacityKeys();
    }, [devicesList]);

    useEffect(() => {
        sortDevices();
    }, [sortByType, sortByHDDCapacity, sortByName, sortedDeviceList, devicesList]);

    const saveDeviceDetails = ({ system_name, type, hdd_capacity, id }) =>
        setDeviceDetails({ system_name, type, hdd_capacity, id });

    const sortDevices = () => {
        let sortedList = devicesList

        sortedList = sortByName === A_Z ? sortBy(sortedList, (o) => o[SYSTEM_NAME].toLowerCase()) : devicesList;

        if (sortByType) {
            sortedList = sortedList.filter((device) => device[TYPE] === sortByType)
        }
        if (sortByHDDCapacity) {
            sortedList = sortedList.filter((device) => Number(device[HDD_CAPACITY]) === sortByHDDCapacity)
        }

        setSortedDeviceList(sortedList)

    }

    const hasfiltersApplied = sortByType || sortByName || sortByHDDCapacity

    const setDeviceTypeKeys = () => {
        devicesList.map((device) => {
            deviceTypes.includes(device[TYPE]) ? null : deviceTypes.push(device[TYPE])
        });

        setTypeSortList(deviceTypes);
    };

    const setHDDCapacityKeys = () => {
        const keys = devicesList.map((device) => Number(device[HDD_CAPACITY]));
        const noDuplicateKeys = keys.filter(
            (device, index) => keys.indexOf(device) === index
        );
        const sortHDDCapacity = (a, b) => a - b
        setHDDCapacitySortList(noDuplicateKeys.sort(sortHDDCapacity));
    };

    const handleDeviceListModal = (isEdit, details = initialDeviceDetails) => {
        setIsEditModal(isEdit);
        saveDeviceDetails(details);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const deviceDetailsDropDown = () => {
        const hasDeviceTypeSortList = (typeSortList.length > 1)

        return <Dropdown>
            <Dropdown.Toggle variant="" id="dropdown-basic" className='text-light text-wrap'>
                Sort by Type
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item eventKey="" onClick={() => setSortByType('')} key={'all'} active={sortByType === ''}>All</Dropdown.Item>
                {hasDeviceTypeSortList && typeSortList.map((device, i) =>
                    <Dropdown.Item eventKey={device} onClick={() => setSortByType(device)} key={device + i} active={sortByType == device}>{parseTypeString(device)}</Dropdown.Item>
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
                <Dropdown.Item eventKey='' onClick={() => setSortByHDDCapacity('')} key={'all'} active={sortByHDDCapacity === ''}>All</Dropdown.Item>
                {hasHDDCapacitySortList && HDDCapacitySortList.map((giga, index) =>
                    <Dropdown.Item eventKey={`${giga}`} onClick={() => setSortByHDDCapacity(giga)} key={giga + index} active={sortByHDDCapacity === giga}>{`${giga} GB`}</Dropdown.Item>
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
                <Dropdown.Item eventKey='' onClick={() => setSortByName('')} active={sortByName === ''}>All</Dropdown.Item>
                <Dropdown.Item eventKey={A_Z} onClick={() => setSortByName(A_Z)} active={sortByName === A_Z}>A-Z</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>;
    }

    const deviceDetailsHeader = () => {
        return (
            <div className="row  pt-3">
                <div className="col-7 bg-black p-2 ">
                    <div className="d-flex flex-row justify-content-between">{systemNameDropDown()}  {deviceDetailsDropDown()}{hDDCapactityDropDown()} <Button id='add_system' onClick={() => handleDeviceListModal(false)}>Add System</Button></div>
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
            <h1>  Something went wrong </h1>
        </div>
    </div>) : (
        <>
            {deviceDetailsHeader()}
            <div className="row">
                <div className="col-7 p-0">
                    {sortedDeviceList.length === 0 && !isFetching && hasfiltersApplied ? <div className=' pt-5 d-flex justify-content-center'>
                        <h2>    No Device matches your search criteria </h2>
                    </div> : sortedDeviceList.length === 0 && !isFetching ? <div>
                        There are no  Devices
                    </div> :
                        <ul className="p-0">
                            {sortedDeviceList.map(({ system_name, type, hdd_capacity, id }) => (
                                <li className="p-2 m-1 border shadow rounded" key={id} >
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
                                                    handleDeviceListModal(true, {
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
            <SystemListModalComponent
                deviceDetails={deviceDetails}
                deviceTypeOptions={typeSortList}
                show={showModal}
                onHide={closeModal}
                isEditSystemDevice={isEditModal}
            />
        </>
    );
};
