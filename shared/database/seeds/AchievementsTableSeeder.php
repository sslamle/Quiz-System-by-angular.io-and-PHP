<?php

use Illuminate\Database\Seeder;

class AchievementsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $achievements = array(
            array('code' => 0, 'name' => 'Không xét', 'shortname' => 'KX'),
            array('code' => 1, 'name' => 'Tập thể Lao động tiên tiến', 'shortname' => 'Tập thể LĐTT'),
            array('code' => 2, 'name' => 'Tập thể Lao động xuất sắc', 'shortname' => 'Tập thể LĐXS'),
            array('code' => 3, 'name' => 'Cờ UBND thành phố', 'shortname' => 'Cờ UBND TP'),
            array('code' => 4, 'name' => 'Cờ Thủ tướng Chính phủ', 'shortname' => 'Cờ TTCP'),
            array('code' => 5, 'name' => 'Giấy khen của Giám đốc Sở Y tế', 'shortname' => 'GKGĐ SYT'),
            array('code' => 6, 'name' => 'Bằng khen của UBND thành phố', 'shortname' => 'BK UBND TP'),
            array('code' => 7, 'name' => 'Bằng khen của Thủ tướng chính phủ', 'shortname' => 'BK TTCP'),
            array('code' => 8, 'name' => 'Huân chương', 'shortname' => 'Huân Chương'),
            array('code' => 9, 'name' => 'Hoàn thành xuất sắc nhiệm vụ', 'shortname' => 'HTXSNV'),
            array('code' => 10, 'name' => 'Hoàn thành tốt nhiệm vụ', 'shortname' => 'HTTNV'),
            array('code' => 11, 'name' => 'Hoàn thành nhiệm vụ', 'shortname' => 'HTNV'),
            array('code' => 12, 'name' => 'Không hoàn thành nhiệm vụ', 'shortname' => 'KHTNV'),
            array('code' => 13, 'name' => 'Lao động tiên tiến', 'shortname' => 'LĐTT'),
            array('code' => 14, 'name' => 'Chiến sỹ thi đua cơ sở', 'shortname' => 'CSTĐ Cơ Sở'),
            array('code' => 15, 'name' => 'Chiến sỹ thi đua thành phố', 'shortname' => 'CSTĐ T.Phố'),
            array('code' => 16, 'name' => 'Chiến sỹ thi đua toàn quốc', 'shortname' => 'CSTĐ T.Quốc'),
            array('code' => 17, 'name' => 'Kỷ niệm chương', 'shortname' => 'Kỷ niệm chương'),
            array('code' => 18, 'name' => 'Thầy thuốc nhân dân', 'shortname' => 'TTND'),
            array('code' => 19, 'name' => 'Thầy thuốc ưu tú', 'shortname' => 'TTƯT')
        );

        foreach ($achievements as $value) {
            DB::table('achievements')->insert($value);
        }
        
    }
}
