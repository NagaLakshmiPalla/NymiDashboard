import { Sidenav, Nav } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';

import 'rsuite/dist/rsuite.min.css';

const SideNav =() =>{
    return(
        <div style={{ width: 240 }}>
        <Sidenav  appearance='subtle'>
          <Sidenav.Body>
            <Nav >
              <Nav.Item eventKey="1" icon={<DashboardIcon />}>
                Dashboard
              </Nav.Item>
            </Nav>
          </Sidenav.Body>
        </Sidenav>
      </div>
    )
}
export default SideNav;