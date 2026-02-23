import React from 'react';
import { useLoaderData, useSearchParams } from 'react-router-dom';
import { LuMap as Map, LuMapPin as MapPin, LuArrowDown as ArrowDown, LuChevronDown as ChevronDown } from 'react-icons/lu';

import type { RegionsData } from './loader';
import { MdLocationCity, MdOutlineFilterAltOff } from "react-icons/md";
import { PiGlobeHemisphereWestFill } from 'react-icons/pi';

export default function App() {
  const data = useLoaderData() as RegionsData;
  const [searchParams, setSearchParams] = useSearchParams();

  const provinceId = searchParams.get("province") || "";
  const regencyId = searchParams.get("regency") || "";
  const districtId = searchParams.get("district") || "";

  // cascades
  const provinces = data.provinces || [];
  const regencies = provinceId ? (data.regencies || []).filter(r => r.province_id.toString() === provinceId) : [];
  const districts = regencyId ? (data.districts || []).filter(d => d.regency_id.toString() === regencyId) : [];

  // active selections
  const activeProvince = provinces.find(p => p.id.toString() === provinceId);
  const activeRegency = regencies.find(r => r.id.toString() === regencyId);
  const activeDistrict = districts.find(d => d.id.toString() === districtId);

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val) {
      setSearchParams({ province: val });
    } else {
      setSearchParams({});
    }
  };

  const handleRegencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val) {
      setSearchParams({ province: provinceId, regency: val });
    } else {
      setSearchParams({ province: provinceId });
    }
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val) {
      setSearchParams({ province: provinceId, regency: regencyId, district: val });
    } else {
      setSearchParams({ province: provinceId, regency: regencyId });
    }
  };

  const handleReset = () => {
    setSearchParams({});
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Sidebar */}
      <aside className="w-80 bg-white border-r border-slate-200 p-8 flex flex-col gap-10 shadow-sm relative z-10 transition-colors">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100/70 text-blue-400 rounded-xl shadow-inner border border-blue-100">
            <PiGlobeHemisphereWestFill className="size-5" />
          </div>
          <h1 className="text-lg font-bold tracking-tight text-slate-900">Frontend Assessment</h1>
        </div>

        <div className="flex flex-col gap-8">
          <p className="text-[11px] font-bold text-slate-400 tracking-widest uppercase">Filter Wilayah</p>

          <div className="flex flex-col gap-2 relative group">
            <label className="text-xs font-extrabold text-slate-500 tracking-widest uppercase ml-1">Provinsi</label>
            <div className="relative">
              <Map className="absolute left-3.5 top-4 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" strokeWidth={1.5} />
              <select
                name="province"
                value={provinceId}
                onChange={handleProvinceChange}
                className="w-full pl-11 pr-10 py-4 bg-white border border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-[3px] focus:ring-blue-100 focus:outline-none appearance-none transition-all cursor-pointer text-sm font-semibold hover:bg-slate-50/80 shadow-sm"
              >
                <option value="">Pilih Provinsi</option>
                {provinces.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
              <div className="absolute right-4 top-4 pointer-events-none">
                <ChevronDown className="w-5 h-5 text-slate-400" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 relative group">
            <label className="text-xs font-extrabold text-slate-500 tracking-tighter uppercase ml-1">Kota / Kabupaten</label>
            <div className="relative">
              <MdLocationCity className="absolute left-3.5 top-4 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              <select
                name="regency"
                value={regencyId}
                onChange={handleRegencyChange}
                disabled={!provinceId}
                className="w-full pl-11 pr-10 py-4 bg-white border border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-[3px] focus:ring-blue-100 focus:outline-none appearance-none transition-all cursor-pointer text-sm font-semibold hover:bg-slate-50/80 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:shadow-none"
              >
                <option value="">Pilih Kota/Kabupaten</option>
                {regencies.map(r => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </select>
              <div className="absolute right-4 top-4 pointer-events-none">
                <ChevronDown className="w-5 h-5 text-slate-400" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 relative group">
            <label className="text-xs font-extrabold text-slate-500 tracking-widest uppercase ml-1">Kecamatan</label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-4 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" strokeWidth={1.5} />
              <select
                name="regency" 
                id="district"
                value={districtId}
                onChange={handleDistrictChange}
                disabled={!regencyId}
                className="w-full pl-11 pr-10 py-4 bg-white border border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-[3px] focus:ring-blue-100 focus:outline-none appearance-none transition-all cursor-pointer text-sm font-semibold hover:bg-slate-50/80 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:shadow-none"
              >
                <option value="">Pilih Kecamatan</option>
                {districts.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
              <div className="absolute right-4 top-4 pointer-events-none">
                <ChevronDown className="w-5 h-5 text-slate-400" strokeWidth={1.5} />
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="mt-2 flex items-center justify-center gap-2 py-3.5 px-4 border shadow-sm border-blue-600 text-slate-600 text-sm tracking-widest font-bold rounded-2xl hover:bg-blue-50 hover:border-blue-700 transition-all focus:ring-[3px] focus:ring-blue-100 focus:outline-none active:scale-[0.98]"
        >
          <MdOutlineFilterAltOff className="w-4 h-4" />
          RESET
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col bg-slate-50 h-screen overflow-y-auto w-full relative">
        <header className="bg-white border-b border-slate-200 p-6 shadow-sm sticky top-0 z-10 w-full flex items-center h-[88px]">
          <nav aria-label="Breadcrumb" className="breadcrumb flex gap-3 text-sm font-bold items-center text-slate-500">
            <span className="hover:text-slate-800 transition-colors tracking-widest cursor-default">Indonesia</span>
            {activeProvince && (
              <>
                <ChevronDown className="w-4 h-4 -rotate-90 text-slate-300" strokeWidth={2.5} />
                <span className="hover:text-slate-800 transition-colors tracking-widest cursor-default">{activeProvince.name}</span>
              </>
            )}
            {activeRegency && (
              <>
                <ChevronDown className="w-4 h-4 -rotate-90 text-slate-300" strokeWidth={2.5} />
                <span className="hover:text-slate-800 transition-colors tracking-widest cursor-default">{activeRegency.name}</span>
              </>
            )}
            {activeDistrict && (
              <>
                <ChevronDown className="w-4 h-4 -rotate-90 text-slate-300" strokeWidth={2.5} />
                <span className="text-blue-400 tracking-widest">{activeDistrict.name}</span>
              </>
            )}
          </nav>
        </header>

        <section className="flex-1 p-10 flex items-center justify-center relative w-full overflow-hidden">
          <div className="w-full max-w-4xl flex flex-col gap-10 items-center justify-center text-center -mt-10">
            {activeProvince ? (
              <div className="w-full flex flex-col items-center gap-3">
                <span className="text-xs font-extrabold text-blue-400/80 tracking-[0.2em] uppercase">Provinsi</span>
                <h2 className="text-7xl font-extrabold text-slate-900 tracking-tight drop-shadow-sm">{activeProvince.name}</h2>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-6 text-slate-300">
                <Map className="w-20 h-20 stroke-[1]" />
                <p className="text-2xl font-semibold tracking-tight text-slate-400">Pilih provinsi untuk melihat data</p>
              </div>
            )}

            {activeRegency && (
              <>
                <div className="text-slate-200">
                  <ArrowDown className="w-6 h-6" strokeWidth={2} />
                </div>
                <div className="w-full flex flex-col items-center gap-3">
                  <span className="text-xs font-extrabold text-blue-400/80 tracking-[0.2em] uppercase">Kota / Kabupaten</span>
                  <h2 className="text-5xl font-bold text-slate-800 tracking-tight drop-shadow-sm">{activeRegency.name}</h2>
                </div>
              </>
            )}

            {activeDistrict && (
              <>
                <div className="text-slate-200">
                  <ArrowDown className="w-6 h-6" strokeWidth={2} />
                </div>
                <div className="w-full flex flex-col items-center gap-3">
                  <span className="text-xs font-extrabold text-blue-400/80 tracking-[0.2em] uppercase">Kecamatan</span>
                  <h2 className="text-4xl font-bold tracking-tight text-slate-900 drop-shadow-sm">{activeDistrict.name}</h2>
                </div>
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
