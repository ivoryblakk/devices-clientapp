# Devices Client Applications

# Description
This is a dashboard that allows a user to view all computer systems in a database. The user may sort the devices alphabetically, sort by system type or HDD capacity. If a user does not see a system included in the list they have the ability to "Add Device" to the database or if the user wants to update/edit the existing info of that particular device, they can do so by clicking the pencil icon on the revelant card. Lastly, if the user no longer wants the device stored in the database they can once again click the pencil icon and click the "Delete Device" button in the update/edit modal.

# Installation
1. Clone or download this repo
2. Please download or clone this repository in order to use the server app.
https://github.com/NinjaMSP/devicesTask_serverApp
3. Run the following commands
```bash
$ npm install
$ npm start
```
4. In a new terminal or Bash  run
```bash
 npm install -g nx
 ```
 Note: Node 14 and above is required for nx [More about NX](nx.dev)
5. Once installed, In the terminal go to the directory of this file "devices-clientapp".
6. Write the commands below in the terminal where this repo is located
```bash
$ npm install
$ nx server devices-clientapp
 ```


#End to End testing
1.In the terminal go to the directory of this file "devices-clientapp" and run
```bash
$ nx e2e  devices-clientapp-e2e
 ```
 
 Note: nx server devices-clientapp should not be running
