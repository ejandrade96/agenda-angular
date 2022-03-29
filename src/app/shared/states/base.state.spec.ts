// Angular
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

// States
import { StateBase } from './base.state';

describe('State: StateBase', () => {

    let service: StateBase;
	beforeEach(() => {
		TestBed.configureTestingModule({
			schemas: [NO_ERRORS_SCHEMA],
			providers: [
				StateBase
			]
		});
		service = TestBed.get(StateBase);
	});
});