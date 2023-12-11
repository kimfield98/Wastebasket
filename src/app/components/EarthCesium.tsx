"use client"
import React, { useState, useEffect, useRef } from 'react';
import {
  Viewer,
  Math,
  Cartesian3,
  Color,
  IonWorldImageryStyle,
  createWorldImageryAsync,
  CustomDataSource,
  ScreenSpaceEventHandler,
  defined,
  ScreenSpaceEventType,
  Ellipsoid,
  Entity,
  JulianDate,
  ConstantProperty,
  HeightReference,
  DirectionalLight,
  NearFarScalar,
} from 'cesium';
import { useRouter, useSearchParams } from 'next/navigation';
import 'cesium/Build/Cesium/Widgets/widgets.css';
import DidLeftSidebar from './DidLeftSidebar';
import { useRecoilState, useRecoilValue } from 'recoil';
import { dataState, DataType, filterState, mailAlarmState, PostAlerInfo,userLoginState, clickAlertInfo } from '../recoil/dataRecoil';
import { AlertModule } from './AlertModule';
import axios from 'axios';
import ChatToggleComponent from './ChatToggle';
import FilterBtnComponent from './FilterBtn';
import Cookies from 'js-cookie';

interface disasterInfoHover {
  dId: string;
  dType: string;
  dCountry: string;
  dStatus: string;
  dDate: string;
}

interface alertInfoHover {
  alertCountryName: string;
  alertRadius: number;
  alertlevelRed: boolean;
  alertlevelOrange: boolean;
  alertlevelGreen: boolean;
  createAt: string;
}

// interface disasterInfo {
//   dId: string;
//   dType: string;
//   dCountry: string;
//   dStatus: string;
//   dDate: string;
//   dCountryLatitude: number;
//   dCountryLongitude: number;
//   dLatitude: string;
//   dLongitude: string;
//   objectId: number;
// }

interface AnimationState {
  stop: () => void;
  entity: Entity;
  originalSize: number;
}

const EarthCesium = () => {
  const cesiumContainer = useRef(null);
  const router = useRouter();
  const search = useSearchParams();
  const viewerRef = useRef<Viewer | null>(null);
  const dataFilter = useRecoilValue(filterState);
  const [isUserInput, setIsUserInput] = useState(true);
  const [data, setData] = useRecoilState(dataState);
  const [dIdValue, setDIdValue] = useState<string>('');
  const [custom, setCustom] = useState<CustomDataSource | null>(null);
  const [clickedEntity, setClickedEntity] = useState(null);
  const [activeAnimation, setActiveAnimation] = useState<AnimationState | null>(null);
  const [showAlertTab, setShowAlertTab] = useState<boolean>(false);
  const [mailAlarmInfo,setMailAlarmInfo] = useRecoilState(mailAlarmState);
  const [alertData, setAlertData] = useState<PostAlerInfo[]>([]);
  const isLogin= useRecoilValue(userLoginState);
  const setClickalert = useRecoilState(clickAlertInfo)


  // 재난 타입에 따른 색상 지정
  function getColorForDisasterType(type: any) {
    switch (type) {
      case "Tropical Cyclone":
        return "RED";
      case 'Mud Slide':
        return "BROWN";
      case 'Flash Flood':
        return "DARKBLUE";
      case 'Wild Fire':
        return "ORANGE";
      case 'Cold Wave':
        return "CYAN";
      case 'Technological Disaster':
        return "GRAY";
      case 'Snow Avalanche':
        return "LIGHTSKYBLUE";
      case 'Volcano':
        return "DARKRED";
      case 'Fire' && 'Forest Fire':
        return "FIREBRICK";
      case 'Epidemic':
        return "GREENYELLOW";
      case 'Storm Surge':
        return "STEELBLUE";
      case 'Tsunami':
        return "DEEPSKYBLUE";
      case 'Insect Infestation':
        return "OLIVE";
      case 'Drought':
        return "TAN";
      case 'Earthquake':
        return "SIENNA";
      case 'Flood':
        return "NAVY";
      case 'Land Slide':
        return "SADDLEBROWN";
      case 'Severe Local Storm':
        return "DARKSLATEGRAY";
      case 'Extratropical Cyclone':
        return "DARKORCHID";
      case 'Heat Wave':
        return "RED2";
      default:
        return "WHITE";
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined' && cesiumContainer.current) {
      let viewer = new Viewer(cesiumContainer.current, {
        animation: false, // 애니메이션 위젯 비활성화
        baseLayerPicker: false,// 베이스 레이어 선택기 비활성화
        fullscreenButton: false,// 전체 화면 버튼 비활성화
        vrButton: false,// VR 버튼 비활성화
        geocoder: true,// 지오코더 비활성화
        homeButton: true,// 홈 버튼 비활성화
        infoBox: false,// 정보 박스 비활성화
        sceneModePicker: false,// 장면 모드 선택기 비활성화
        selectionIndicator: false,// 선택 지시기 비활성화
        timeline: false,// 타임라인 비활성화
        navigationHelpButton: false,// 네비게이션 도움말 버튼 비활성화
        creditContainer: document.createElement("none"), // 스택오버플로우 참고
      });

      viewer.scene.screenSpaceCameraController.minimumZoomDistance = 0; // 최소 확대 거리 (미터 단위)
      viewer.scene.screenSpaceCameraController.maximumZoomDistance = 30000000; // 최대 확대 거리 (미터 단위)
      viewer.scene.screenSpaceCameraController.enableTilt = false; // 휠클릭 회전 활성화 여부
      viewer.scene.screenSpaceCameraController.enableLook = false; // 우클릭 회전 활성화 여부
      viewer.screenSpaceEventHandler.removeInputAction(ScreenSpaceEventType.LEFT_DOUBLE_CLICK); // 더블클릭 이벤트 제거
      // viewer.scene.globe.maximumScreenSpaceError = 0; // 지형의 최대 화면 공간 오차 (픽셀 단위)
      viewer.scene.globe.enableLighting = false; // 조명 활성화 여부
      viewer.scene.light = new DirectionalLight({
        direction: Cartesian3.fromDegrees(1.0, 1.0, 1.0),
        intensity: 11,
      });

      // 초기 카메라 위치 설정
      viewer.camera.setView({
        destination: Cartesian3.fromDegrees(127.7703,35.4634, 10000000), // 예: -117.16, 32.71, 15000
        orientation: {
          heading: Math.toRadians(20), // 동쪽
          pitch: Math.toRadians(-40), // 아래쪽으로 30도 기울기
          roll: 0 // 120도 회전
        }
      });

      // viewer 인스턴스 저장
      viewerRef.current = viewer;

      // layout 추가
      createWorldImageryAsync({
        style: IonWorldImageryStyle.AERIAL_WITH_LABELS,
      }).then((imageryProvider:any) => {
        viewer.scene.imageryLayers.addImageryProvider(imageryProvider);
        console.log(`Log: Layout loaded successfully.`)
      }).catch((err:Error) => {
        console.log(`Log: Failed to load layout: ${err}`);
      });

      // viewer 정리 로직 추가
      return () => {
        if (viewer && viewer.destroy) {
          viewer?.destroy();
        }
      }
    }
  }, []);

  //데이터 load로직
  const loadData = async () => {
    try {
      const [oldData, newData] = await Promise.all([
        axios.get('https://worldisaster.com/api/oldDisasters'),
        axios.get('https://worldisaster.com/api/newDisasters'),
      ]);
      setData(oldData.data.concat(newData.data));
      setCustom(new CustomDataSource('Disasters'));
      console.log(`Log: Data load successful.`);
    } catch (err) {
      console.log('Log: Data load failed.', err);
    }
  }

  const token = Cookies.get('access-token');

  const alertLoadData = async () => {
    if(!isLogin) return;
    try {
      const response = await axios('https://worldisaster.com/api/emailAlerts/',
      {
        headers: {Authorization: `Bearer ${token}`}
      });
      setAlertData(response.data);
      console.log("Log: Alert data load success.");
    } catch (err) {
      console.log('Log: Alert data load failed.', err);
    } finally {
      applyAlertData();
    }
  }

  // 알람핀을 유동
  const applyAlertData=()=>{
    const viewer = viewerRef.current;
    if (!viewer || !custom) return;
  
    // 기존에 존재하는 'alert' 타입의 엔티티들을 찾아서 삭제
    const existingAlertEntities = custom.entities.values.filter(e => e.properties?.type._value !== 'disaster');
    existingAlertEntities.forEach(entity => custom.entities.remove(entity));
  
    // 새로운 'alertData'를 바탕으로 알람 엔티티들을 추가
    alertData.forEach(alert => {
      if (alert.alertLongitude && alert.alertLatitude) {
        const alertPointEntity = new Entity({
          position: Cartesian3.fromDegrees(alert.alertLongitude, alert.alertLatitude),
          point: {
            pixelSize: 10,
            color: Color.RED,
            outlineColor: Color.WHITE,
            outlineWidth: 2
          },
          properties: {...alert, type: 'alert'}
        });

        const alertEllipseEntity = new Entity({
          position: Cartesian3.fromDegrees(alert.alertLongitude, alert.alertLatitude),
          ellipse: {
            semiMinorAxis: alert.alertRadius * 1000,
            semiMajorAxis: alert.alertRadius * 1000,
            height: 0,
            material: Color.RED.withAlpha(0.1),
            outline: true,
            outlineColor: Color.RED.withAlpha(0.5)
          }
        });

        custom.entities.add(alertPointEntity);
        custom.entities.add(alertEllipseEntity);
        console.log("Log: Alert data apply success.")
      }
    });
  }

  const applyFilters = () => {
    const viewer = viewerRef.current;
    if (!viewer || !viewer.scene || !viewer.camera) {
      return;
    }
    if (!custom) return;
    viewer.dataSources.add(custom);
    let filteredData = data

    if (dataFilter.selectedCountry !== "world") {
      filteredData = filteredData.filter((item: DataType) => item.dCountry === dataFilter.selectedCountry);
    }
    if (dataFilter.selectedDisaster && dataFilter.selectedDisaster.length > 0) {
      filteredData = filteredData.filter((item: DataType) => !dataFilter.selectedDisaster.includes(item.dType));
    }
    if (dataFilter.selectedYear) {
      filteredData = filteredData.filter((item: DataType) => new Date(item.dDate).getFullYear() === dataFilter.selectedYear);
    }
    if (dataFilter.selectedLive !== null) {
      filteredData = filteredData.filter((item: DataType) => (dataFilter.selectedLive ? item.dStatus !== "past" : item.dStatus === "past"));
    }

    custom.entities.removeAll();

    filteredData.forEach((item: DataType) => {
      if (item.dLongitude && item.dLatitude) {
        let entityToAdd;
        if (item.dStatus === 'ongoing' || item.dStatus === 'real-time') {
          item.dStatus === 'ongoing' ? (
            entityToAdd = new Entity({
              position: Cartesian3.fromDegrees(Number(item.dLongitude), Number(item.dLatitude),0),
              point: {
                pixelSize: 10,
                heightReference: 0,
                color: Color.fromCssColorString(getColorForDisasterType(item.dType)),
                scaleByDistance: new NearFarScalar(10e3, 5, 10e6, 1)
              },
              properties: {...item, type:'disaster'}
            })) : (
            entityToAdd = new Entity({
              position: Cartesian3.fromDegrees(Number(item.dLongitude), Number(item.dLatitude)),
              model: {
                uri: `/pin.glb`,
                minimumPixelSize: 100,
                maximumScale: 80000,
                heightReference: HeightReference.CLAMP_TO_GROUND,
              },
              properties: {...item, type:'disaster'}
            }))
        } else {
          entityToAdd = new Entity({
            position: Cartesian3.fromDegrees(Number(item.dLongitude), Number(item.dLatitude)),
            point: {
              pixelSize: 10,
              heightReference: 0,
              color: Color.fromCssColorString(getColorForDisasterType(item.dType)),
              scaleByDistance: new NearFarScalar(10e3, 5, 10e6, 1)
            },
            properties: {...item, type:'disaster'}
          });
        }
        // rotateEntity(entityToAdd, viewer, item);
        custom.entities.add(entityToAdd)
      }
    });
  }

  useEffect(() => {
    loadData();
    alertLoadData()
  }, []);
  
  useEffect(()=>{
    if (!custom || !viewerRef.current) return;
    alertLoadData()
  },[mailAlarmInfo])

  useEffect(()=>{
    alertLoadData()
    console.log(3)
  },[mailAlarmInfo])

  useEffect(() => {
    if (!custom || !viewerRef.current) return;
    // custom.entities.removeAll();
    viewerRef.current.dataSources.remove(custom);
  }, [dataFilter])

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer || !viewer.scene || !viewer.camera) {
      return;
    }
    const customDataSource = new CustomDataSource('Disasters');
    viewer.dataSources.add(customDataSource);
  }, [dataFilter, data]);

  useEffect(() => {
    if (!custom || !viewerRef.current) return;
    applyFilters();
  }, [dataFilter, data])  

  // 호버 이벤트 관리
  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer || !viewer.scene || !viewer.camera) {
      return;
    }

    const tooltip = document.createElement('div') as HTMLDivElement;
    tooltip.style.display = 'none';
    tooltip.style.position = 'absolute';
    tooltip.style.backgroundColor = 'white';
    tooltip.style.border = '1px solid white';
    tooltip.style.borderRadius = '10px';
    tooltip.style.padding = '5px';
    tooltip.style.color = 'black';
    document.body.appendChild(tooltip);

    const tooltipContent = document.createElement('div') as HTMLDivElement;
    tooltipContent.style.display = 'none';
    tooltipContent.style.position = 'absolute';
    tooltipContent.style.backgroundColor = 'white';
    tooltipContent.style.border = '1px solid white';
    tooltipContent.style.borderRadius = '10px';
    tooltipContent.style.padding = '5px';
    tooltipContent.style.color = 'black';
    document.body.appendChild(tooltipContent);

    // 핸들러 모음
    const handler = new ScreenSpaceEventHandler(viewer.scene.canvas);

    // 호버 이벤트
    handler.setInputAction((movement: any) => {
      const pickedObject = viewerRef.current?.scene.pick(movement.endPosition);
      if (defined(pickedObject) && pickedObject.id && pickedObject.id.properties) {
        const properties = pickedObject.id.properties;

        // 알림 데이터일 경우랑 재난일 경우 구분하기
        if (properties._type && properties._type._value === "alert"){
          const alertrData: alertInfoHover = {
            alertCountryName: properties._alertCountryName?._value,
            alertRadius: properties._alertRadius?._value,
            alertlevelRed: properties._alertLevelRed?._value,
            alertlevelOrange: properties._alertLevelOrange?._value,
            alertlevelGreen: properties._alertLevelGreen?._value,
            createAt: properties._createdAt?._value,
          };
          tooltipContent.innerHTML = `
          <div style="
          background-color: rgba(255, 255, 255, 0.9); 
          border-radius: 8px; 
          padding: 10px; 
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          font-family: Arial, sans-serif;
          max-width: 200px;
          line-height: 1.4;
        ">
            <table style="padding:2px;">
              <tbody>
                <tr>
                  <td style="color: #666;">Country :</td>
                  <td style="color: #000;">${alertrData.alertCountryName}</td>
                </tr>
                <tr>
                  <td style="color: #666;">Radius :</td>
                  <td style="color: #000;">${alertrData.alertRadius} km</td>
                </tr>
                <tr>
                  <td style="color: #666;">AlertLevel :</td>
                  <td style="color: #000;">
                  <div style="display: flex; align-items: center; justify-content: center;">
                    <span style="margin: 10px; height: 10px; width: 10px; background-color: ${alertrData.alertlevelRed ? "red" : "gray"}; border-radius: 50%;"></span>
                    <span style="margin: 10px; height: 10px; width: 10px; background-color: ${alertrData.alertlevelOrange ? "orange" : "gray"}; border-radius: 50%;"></span>
                    <span style="margin: 10px; height: 10px; width: 10px; background-color: ${alertrData.alertlevelGreen ? "green" : "gray"}; border-radius: 50%;"></span>
                  </div>
                  </td>
                </tr>
                <tr>
                  <td style="color: #666;">CreateAt:</td>
                  <td style="color: #000;">${alertrData.createAt.slice(0,10)}</td>
                </tr>
              </tbody>
            </table>
          </div>`;
        tooltipContent.style.display = 'block';
        // 툴팁 위치 조정
      } else {
        tooltipContent.style.display = 'none';
      }
      if(properties._type && properties._type._value === "disaster") {

        const tDisasterData: disasterInfoHover = {
          dId: properties._dID?._value,
          dType: properties._dType?._value,
          dCountry: properties._dCountry?._value,
          dStatus: properties._dStatus?._value,
          dDate: properties._dDate?._value,
        };

        tooltip.innerHTML = `
        <div style="
        background-color: rgba(255, 255, 255, 0.9); 
        border-radius: 8px; 
        padding: 10px; 
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        font-family: Arial, sans-serif;
        max-width: 200px;
        line-height: 1.4;
      ">
            <img src="./Disaster/${tDisasterData.dType}.png" alt="${tDisasterData.dType}" style="width: 36px; height: 36px; margin-bottom: 10px;">
            <table>
              <tbody>
                <tr>
                  <td style="color: #666;">Type:</td>
                  <td style="color: #000;">${tDisasterData.dType}</td>
                </tr>
                <tr>
                  <td style="color: #666;">Country:</td>
                  <td style="color: #000;">${tDisasterData.dCountry}</td>
                </tr>
                <tr>
                  <td style="color: #666;">Date:</td>
                  <td style="color: #000;">${tDisasterData.dDate}</td>
                </tr>
                <tr>
                  <td style="color: #666;">Status:</td>
                  <td style="color: #000;">${tDisasterData.dStatus}</td>
                </tr>
              </tbody>
            </table>
          </div>`;
      

        tooltip.style.display = 'block';
        // 툴팁 위치 조정
      } else {
        tooltip.style.display = 'none';
      }
      adjustTooltipPosition(movement.endPosition, tooltip, tooltipContent);
    } else {
      tooltip.style.display = 'none';
      tooltipContent.style.display = 'none';
    }
  }, ScreenSpaceEventType.MOUSE_MOVE);

    // 툴팁 위치 조정 함수
    const adjustTooltipPosition = (position: any, tooltipElement:any, tooltipContentElement:any) => {
      const adjustPosition = (element:any) => {
        const elementWidth = element.offsetWidth;
        const elementHeight = element.offsetHeight;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
    
      let left = position.x+ window.innerWidth/3+10;
      let top =  position.y- elementHeight;

      // 오른쪽 가장자리 처리
      if (left + elementWidth > windowWidth) {
        left = windowWidth - elementWidth;
      }

      // 하단 가장자리 처리
      if (top + elementHeight > windowHeight) {
        top = windowHeight - elementHeight;
      }
        
        // 툴팁 위치 설정
        element.style.left = `${left}px`;
        element.style.top = `${top}px`;
      };
        // 각 툴팁 요소에 대해 위치 조정
    adjustPosition(tooltipElement);
    adjustPosition(tooltipContentElement);
  };

    return () => {
      handler.destroy();
    };
  }, [viewerRef.current]);

  // 우클릭 이벤트 관리
  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer || !viewer.scene || !viewer.camera) {
      return;
    }
    
    // 핸들러 모음
    const handler = new ScreenSpaceEventHandler(viewer.scene.canvas);

    // 우클릭 이벤트의 토글 확인용
    let lastAddedEntity: Entity | null = null;

    // 우클릭 이벤트
    handler.setInputAction((movement:any) => {
      // 클릭한 스크린 좌표를 카르테시안 좌표로 변환
      const cartesian = viewer.camera.pickEllipsoid(movement.position, viewer.scene.globe.ellipsoid);
      if (cartesian) {
        // 카르테시안 좌표를 위도와 경도로 변환
        const cartographic = Ellipsoid.WGS84.cartesianToCartographic(cartesian);
        const lon = Math.toDegrees(cartographic.longitude).toFixed(4);
        const lat = Math.toDegrees(cartographic.latitude).toFixed(4);

        // 여기에 추가적인 로직을 구현할 수 있습니다, 예를 들어, UI 요소에 지역 이름을 표시
        setMailAlarmInfo( {...mailAlarmInfo, alertLongitude:Number(lon), alertLatitude:Number(lat), open:true});
        setShowAlertTab(true);

        // 마지막으로 추가된 엔티티가 존재하면 삭제
        if (lastAddedEntity){
          viewer.entities.remove(lastAddedEntity);
        }

        // 우클릭한 위치에 점 추가
        lastAddedEntity = viewer.entities.add({
          position: Cartesian3.fromDegrees(Number(lon), Number(lat)),
          point: {
            pixelSize: 10,
            color: Color.RED,
            outlineColor: Color.WHITE,
            outlineWidth: 2
          },
          ellipse: {
            semiMinorAxis : mailAlarmInfo.alertRadius*1000,
            semiMajorAxis : mailAlarmInfo.alertRadius*1000,
            height: 0,
            material: Color.RED.withAlpha(0.2),
            outline : true,
            outlineColor : new Color(255, 0, 0, 127),
          },
          id: String(mailAlarmInfo.objectId)
        });
      }  
    }, ScreenSpaceEventType.RIGHT_CLICK);

    return () => {
      handler.destroy();
    };
  }, [viewerRef.current]);

  useEffect(()=>{
    const viewer = viewerRef.current;
    if (!viewer || !viewer.scene || !viewer.camera) {
      return;
    }

    const entityId = mailAlarmInfo.objectId;
    const entity = viewer.entities.getById(String(entityId));

    if (entity && entity.ellipse){
      entity.ellipse.semiMinorAxis = new ConstantProperty(mailAlarmInfo.alertRadius*1000);
      entity.ellipse.semiMajorAxis = new ConstantProperty(mailAlarmInfo.alertRadius*1000);
    }

    if (entity && mailAlarmInfo.open==false){
      viewer.entities.remove(entity);
    }

  },[mailAlarmInfo])


  // 좌클릭 이벤트 관리
  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer || !viewer.scene || !viewer.camera) {
      return;
    }

    // 핸들러 모음
    const handler = new ScreenSpaceEventHandler(viewer.scene.canvas);

    // 원클릭 이벤트
    handler.setInputAction((click: any) => {
      const pickedObject = viewer.scene.pick(click.position);
      if (defined(pickedObject) && pickedObject.id && pickedObject.id.properties) {
        const properties = pickedObject.id.properties;
        // 'alert' 타입인 경우 처리하지 않음
        if (properties._type && properties._type._value === "disaster") {     
          const clickDisasterData = {
            dId: properties._dID?._value,
            dType: properties._dType?._value,
            dCountry: properties._dCountry?._value,
            dStatus: properties._dStatus?._value,
            dDate: properties._dDate?._value,
            dCountryLatitude: properties._dCountryLatitude?._value,
            dCountryLongitude: properties._dCountryLongitude?._value,
            dLatitude: properties._dLatitude?._value,
            dLongitude: properties._dLongitude?._value,
            objectId: properties._objectId?._value,
          };
          const camaraHeight = Ellipsoid.WGS84.cartesianToCartographic(viewer.camera.position).height;
          router.push(`/earth?lon=${clickDisasterData.dLongitude}&lat=${clickDisasterData.dLatitude}&height=${camaraHeight}&did=${clickDisasterData.dId}`, undefined);
          setDIdValue(clickDisasterData.dId);
          setIsUserInput(true)
          setClickedEntity(pickedObject.id);
        } else if (properties._type && properties._type._value === "alert"){
          const properties = pickedObject.id.properties;
          const clickAlertData = {
            alertDistrictName: properties.alertDistrictName?._value,
            alertCountryName: properties._alertCountryName?._value,
            alertRadius: properties.alertRadius?._value,
            alertlevelRed: properties.alertLevelRed?._value,
            alertlevelOrange: properties.alertLevelOrange?._value,
            alertlevelGreen: properties.alertLevelGreen?._value,
            alertLatitude: properties.alertLatitude?._value,
            alertLongitude: properties.alertLongitude?._value,
            objectId: properties.objectId?._value,
            alertEmail:  properties.alertEmail?._value,
            createAt: properties.createAt?._value,
            memo: properties.memo?._value,
            open: true,
            edit: true,
          };
          if (clickAlertData.alertLatitude < -65 && clickAlertData.alertLatitude > 70 && clickAlertData.alertLongitude < -180 && clickAlertData.alertLongitude > 180) return;
          setShowAlertTab(true);
          setMailAlarmInfo(clickAlertData)
        }
      }
    }, ScreenSpaceEventType.LEFT_CLICK);

    return () => {
      handler.destroy();
    };

  }, [viewerRef.current]);

  // 클릭된 엔티티 변경 감지
  useEffect(() => {
    if (clickedEntity) {
      if (activeAnimation) {
        activeAnimation.stop();
        if (activeAnimation.entity.point) {
          activeAnimation.entity.point.pixelSize = new ConstantProperty(activeAnimation.originalSize);
        }
      }
      applyBlinkingEffect(clickedEntity);
    }
  }, [clickedEntity]);

  const applyBlinkingEffect = (entity: Entity) => {
    if (!entity.point?.pixelSize) return;

    let growing = true; // 크기가 커지고 있는지 여부를 나타내는 플래그
    const originalSize = entity.point.pixelSize.getValue(JulianDate.now());
    const maxSize = originalSize * 5; // 최대 크기
    let currentSize = originalSize;

    const onTickListener = () => {
      if (!entity.point) return;

      if (growing) {
        currentSize += 1.5; // 점점 커지게 함
        if (currentSize >= maxSize) growing = false; // 최대 크기에 도달하면 줄어드는 것으로 전환
      } else {
        currentSize -= 1.5; // 점점 작아지게 함
        if (currentSize <= originalSize) growing = true; // 원래 크기로 돌아오면 다시 커지는 것으로 전환
      }

      entity.point.pixelSize = new ConstantProperty(currentSize);
    };

    if (activeAnimation) {
      activeAnimation.stop();
    }

    viewerRef.current?.clock.onTick.addEventListener(onTickListener);

    // 애니메이션 상태 업데이트
    setActiveAnimation({
      stop: () => viewerRef.current?.clock.onTick.removeEventListener(onTickListener),
      entity: entity,
      originalSize: originalSize
    });
  };

  // 카메라 이동마다 이벤트 관리
  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer || !viewer.scene || !viewer.camera) {
      return;
    };

    const moveEndListener = viewer.camera.moveEnd.addEventListener(() => {
      const cameraPosition = viewer.camera.positionCartographic;
      const longitude = Math.toDegrees(cameraPosition.longitude).toFixed(4);
      const latitude = Math.toDegrees(cameraPosition.latitude).toFixed(4);
      const cameraHeight = Ellipsoid.WGS84.cartesianToCartographic(viewer.camera.position).height;
      router.push(`/earth?lon=${longitude}&lat=${latitude}&height=${cameraHeight}`, undefined);
    });

    return () => {
      if (!isUserInput) {
        moveEndListener()
      }
    }

  }, [viewerRef.current?.camera, search.get('did')]);

  // url로 들어오는 경우 이벤트 관리
  useEffect(() => {
    const viewer = viewerRef.current;
    const lon = search.get('lon');
    const lat = search.get('lat');
    const zoomHeight = search.get('height');
    const detail = search.get('did');
    if (!viewer || !viewer.scene || !viewer.camera || !isUserInput) {
      return;
    };
    if (lon && lat && viewer && viewer.scene && viewer.camera) {
      viewer.camera.flyTo({
        destination: Cartesian3.fromDegrees(lon ? Number(lon) : 0, lat ? Number(lat) : 0, zoomHeight ? Number(zoomHeight) : 10e5),
        duration: 1,
        complete: () => {
          if (detail) {
            setDIdValue(detail);
          }
        }
      });
    }
  }, [search.get('lon'), search.get('lat'), search.get('height'), search.get('did')]);

  return (
    <div className="grid grid-cols-3 ">
      <div>
        <DidLeftSidebar dID={dIdValue} />
      </div>
      <div className=' col-span-2'>
        <div className=' h-[100vh] mt-[3.5rem]' ref={cesiumContainer}>
          <AlertModule />
          <ChatToggleComponent />
          <FilterBtnComponent />
        </div>
      </div>
    </div>
  );
};

export default EarthCesium;