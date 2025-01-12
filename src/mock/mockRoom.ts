// mock 데이터 작성에 참고한 페이지: https://www.airbnb.co.kr/rooms/32653933?adults=1&category_tag=Tag%3A8653&children=0&enable_m3_private_room=true&infants=0&pets=0&photo_id=856873117&search_mode=flex_destinations_search&check_in=2025-01-07&check_out=2025-01-12&source_impression_id=p3_1736210395_P3sFL0FCHv4elBOr&previous_page_section_name=1000&federated_search_id=77c3d440-96f7-4b58-b2d5-a90fba7cdf54
export const mockRoom = {
  id: 1,
  host: {
    id: 65,
    username: '성윤',
    password: 'SPERUCcZKZ',
    provider: 'LOCAL',
    reservations: [
      {
        id: 612,
        user: 'vxBWiWTXIF',
        room: {
          id: 591,
          host: 'zKezOnzYKx',
          name: 'sRlXgmYvAp',
          description: 'xPUKIiVNcZEDDJSCwwBPTszrRwIlsrUgnOsIegFtehjoowRIaA',
          type: 'Studio',
          address: 'paDzEvdmTfbguGKwQqVW',
          price: 254,
          maxOccupancy: 5,
          reservations: ['hbTszPSUFq'],
          reviews: [
            {
              id: 220,
              user: 'YMAbJrUiWf',
              reservation: 'EkiirlEIpC',
              room: 'qcnMAZAWBh',
              content:
                'fqRpBOvpFkxSVMssYlWRHekXEPMCcSlBNycTgqvgiZYFcNcNUEUeOerLYxKnSdgvWhAYnzlHSWedRwWOBDgxMicfXDSeSqtyPNrn',
              rating: 2,
            },
          ],
          createdAt: '2025-01-07T01:36:35.231Z',
          updatedAt: '2025-01-07T01:36:35.231Z',
        },
        review: {
          id: 796,
          user: 'nWIFNNxoiK',
          reservation: 'jVzZfKzbgh',
          room: 'gcsMtuKEbm',
          content:
            'pTmUSBJbOWBMPZGfiXkiDxNlhWsgyEAQkePUNclwccIXEzHoFDBajhHMtqbDQLgePQUtLaFUTxjNNSOknTYziUinOuRApaybiAWa',
          rating: 4,
        },
        startDate: '2025-01-07',
        endDate: '2025-01-08',
        totalPrice: 614,
      },
    ],
    rooms: [
      {
        id: 924,
        host: 'iaWVlGxPlx',
        name: 'eCIIDYNAYg',
        description: 'UAucKzQxZopHapFFBZpFRdDtWkoCblYqNXmpfGWLCOQZPQEPIt',
        type: 'Studio',
        address: 'tJOxubsGGLYpylCgpKGX',
        price: 50,
        maxOccupancy: 3,
        reservations: ['ZFwIGaxNgE', 'zqfhKMUlKk', 'hdMMaPoLzv', 'fAKkuYjcEX'],
        reviews: [
          {
            id: 621,
            user: 'ANdkPqqxiC',
            reservation: 'HEbAtqfddR',
            room: 'zSdzajuFgz',
            content:
              'OsgjayBLGixGnuEfkAXNmCtvXzgvIlnNqvxogjAklVyDbkZhMVcwDDrqigHnBbbMyLNCUFPbGvQoTmAzhTGzvvGgWMYdFewfgJYU',
            rating: 5,
          },
        ],
        createdAt: '2025-01-07T01:36:35.231Z',
        updatedAt: '2025-01-07T01:36:35.231Z',
      },
    ],
    reviews: [
      {
        id: 151,
        user: 'FQzRfQgZkQ',
        reservation: 'XqJexUxhRr',
        room: 'nOwjlhNPsz',
        content:
          'obHxwzddbTXlfGAVYXWSgTKdfQVFkQFFfPukvWCYYBwmCtoZCTEZTuhJLGQHhAVCTpHIaQBpUhLuuxBGQPAnoDtELNnemfuvqQrF',
        rating: 5,
      },
    ],
    oauthId: 'fCaHEzyTSo',
  },
  name: '토향고택 - 용호정 (신축독채)',
  description: 'EXBPtMaObbYjhwzGUjtkSuwUCugTbqfCyeJHnGRsouGZyfNNYc',
  type1: '게스트용 별채 전체', //type1 은 상세화면 상의 country 뒤의 텍스트와 동일
  type2: '한옥', //type2 는 메인화면의 FilterBar 상의 목록과 동일일
  address: 'UImnjqItebiJqAEjJHjr',
  price: [
    {
      pernight: 320000,
      cleaningfee: 15000,
      charge: 3000,
      total: 338000,
    },
  ],
  superhost: true,
  luggage: true,
  tv: true,
  wifi: true,
  selfcheckin: true,
  info: '고택 대문 밖 정원에 위치한 10평 신축 독채입니다. 정원 안쪽에 따로 위치하여 독립적으로 편안한 시간을 보내기에 더없이 좋은 곳입니다. 앞에는 아름다운 연꽃 연못이 있으며, 방과 툇마루에서 바라보는 정원과 고택, 뒷산의 풍경이 너무나 멋진 독채입니다.',
  maxOccupancy: 4,
  bedroom: 1,
  bathroom: 1,
  bed: 1,
  avgrating: 4.92,
  reviewcount: 22,
  createdAt: '2025-01-07T01:36:35.231Z',
  updatedAt: '2025-01-07T01:36:35.231Z',
  location: {
    country: '한국',
    city: '',
    suburb: 'Bonghwa-gun',
    town: 'Bonghwa-eup',
  },
};
