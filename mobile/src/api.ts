
import axios from 'axios';
import { API_URL } from './config';

export const api = axios.create({ baseURL: API_URL });

export type HelpType = 'MATERIAL' | 'VOLUNTEER';
export type RequestStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE';

export async function listLocations() { return (await api.get('/locations')).data; }
export async function createLocation(payload: any) { return (await api.post('/locations', payload)).data; }

export async function createRequest(payload: any) { return (await api.post('/requests', payload)).data; }
export async function listRequests(params?: any) { return (await api.get('/requests', { params })).data; }
export async function updateRequestStatus(id: string, status: RequestStatus) { return (await api.patch(`/requests/${id}/status`, { status })).data; }

export async function createOffer(payload: any) { return (await api.post('/offers', payload)).data; }
export async function listOffers() { return (await api.get('/offers')).data; }

export async function getWeather(lat: number, lon: number) { return (await api.get('/public/weather', { params: { lat, lon } })).data; }
