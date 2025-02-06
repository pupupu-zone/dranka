import { createStore, createEvent } from 'effector';

import type { ActionT, ActionsStoreT } from '@store/types.d';

const DEFAULT_ACTION: Omit<ActionT, 'action_id'> = {
	weight: 100,
	highlight_time: 0,
	is_slider_active: false
};

export const addAction = createEvent<Partial<ActionT>>();
export const updateAction = createEvent<Partial<ActionT>>();
export const removeAction = createEvent<ActionT['action_id']>();
export const setSliderActive = createEvent<{
	action_id: ActionT['action_id'];
	is_slider_active: ActionT['is_slider_active'];
}>();
export const setReset = createEvent();

const $actions = createStore<ActionsStoreT>([]);

$actions.on(addAction, (state, payload) => {
	const cleanedActions = state.filter((a) => a.action_id !== payload.action_id);

	const nextAction = {
		...DEFAULT_ACTION,
		...payload,
		action_id: payload.action_id || ''
	};

	return [...cleanedActions, nextAction];
});

$actions.on(updateAction, (state, payload) => {
	const updatedActions = state.map((action) => {
		return action.action_id === payload.action_id ? { ...action, ...payload } : action;
	});

	return updatedActions;
});

$actions.on(removeAction, (state, payload) => {
	const updatedActions = state.filter((a) => a.action_id !== payload);

	return updatedActions;
});

$actions.on(setSliderActive, (state, payload) => {
	const updatedActions = state.map((action) => {
		const isSliderActive = action.action_id === payload.action_id ? payload.is_slider_active : false;

		return {
			...action,
			is_slider_active: isSliderActive
		};
	});

	return updatedActions;
});

$actions.on(setReset, () => []);

export default $actions;
