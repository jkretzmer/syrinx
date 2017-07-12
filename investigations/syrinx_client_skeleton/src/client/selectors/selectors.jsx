import { createSelector } from 'reselect'
import sbpIMU from 'libsbp/javascript/sbp/imu';

const getSBPData = (state) => state.sbp_data
const getSBPFilterList = (state, props) => props.sbp_filter

export const makeGetFilteredSBPData = () => {
	return createSelector(
		[getSBPData, getSBPFilterList],
		(sbp_data, sbp_filter) => {
			if((sbp_data === undefined) || (sbp_data[0] === undefined)){
        		console.log('getIMUData: sbp_data undefined')
        		return [];
      		}
      		return sbp_data.filter(msg => sbp_filter.indexOf(msg.msg_type) !== -1)
		}
	)
}