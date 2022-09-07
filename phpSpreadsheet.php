<?php

require '/home/dkhafqqi/vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx; 
$reader = new \PhpOffice\PhpSpreadsheet\Reader\Xlsx();
include("db_connection.php");

if(isset($_POST["download_excel"])){
    $user = $_POST["user"];
    $sql = "SELECT * FROM `users` WHERE `user_name`='$user'";
    $result = $conn->query($sql);
    $results = $result -> fetch_array(MYSQLI_ASSOC);
    $data_from_db = json_decode($results["userObj"],true);
    //echo json_encode($data_from_db);
    //echo count($data_from_db);
    
    $spreadsheet = new Spreadsheet(); 
    //$spreadsheet->getActiveSheet();
    for($sht_idx = 0; $sht_idx < count($data_from_db); $sht_idx++){
        if($sht_idx > 0){
            $spreadsheet->createSheet($sht_idx);
        }
        $sheet = $spreadsheet->getSheet($sht_idx);
        $sheet->setTitle($data_from_db[$sht_idx]["subject"]);
        
        $row_titles = array("Exams/Assignments", "Points", "Grade (%)", "Points Gained", "Target Grade (%)", "Average to get on remaining grades", "Verify");
        
        for($i=0;$i<count($row_titles);$i++) {
            $sheet->setCellValueByColumnAndRow($i+1,1,$row_titles[$i]);
        }
        $sheet->getStyle("A1:H1")->getFont()->setBold( true );
        
        $sum_possible_pts = 0;
        for($i=0;$i<count($data_from_db[$sht_idx]["assignments"]);$i++) {
            $sheet->setCellValueByColumnAndRow(1,$i+2,$data_from_db[$sht_idx]["assignments"][$i]);
            $sheet->setCellValueByColumnAndRow(2,$i+2,$data_from_db[$sht_idx]["possible_points"][$i]);
            $sheet->setCellValueByColumnAndRow(3,$i+2,$data_from_db[$sht_idx]["grades"][$i]);
            
            if(!is_null($data_from_db[$sht_idx]["grades"][$i])){
                $sum_possible_pts += $data_from_db[$sht_idx]["possible_points"][$i];
            }
            
            $sheet->setCellValueByColumnAndRow(4,$i+2,"=B".($i+2)."*C".($i+2)."/100");
            $sheet->setCellValueByColumnAndRow(7,$i+2,"=IF(C".($i+2).", C".($i+2).", \$F\$2)");
            $sheet->setCellValueByColumnAndRow(8,$i+2,"=B".($i+2)."*G".($i+2)."/100");
            
        }
        $sheet->setCellValueByColumnAndRow(5,2,$data_from_db[$sht_idx]["target"][0]);
        
        $sheet->setCellValueByColumnAndRow(1,$i+2,"Total Points Possible:");
        $sheet->setCellValueByColumnAndRow(2,$i+2,"=SUM(B2:B".($i+1).")");
        $sheet->setCellValueByColumnAndRow(3,$i+2,"Total Points Gained:");
        $sheet->setCellValueByColumnAndRow(4,$i+2,"=SUM(D2:D".($i+1).")");
        $sheet->setCellValueByColumnAndRow(6,2,"=IF((B".($i+2)."-".$sum_possible_pts.")>0,((E2*B".($i+2)."/100)-D".($i+2).")/(B".($i+2)."-".$sum_possible_pts.")*100,0)");
        $sheet->setCellValueByColumnAndRow(7,$i+2,"Total Projected Points:");
        $sheet->setCellValueByColumnAndRow(8,$i+2,"=SUM(H2:H".($i+1).")");
        $sheet->setCellValueByColumnAndRow(9,$i+1,"PROJECTED PERCENTAGE");
        $sheet->setCellValueByColumnAndRow(9,$i+2,"=100*H".($i+2)."/B".($i+2));
        
        
        $sheet->getStyle("F2")->getFill()->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)->getStartColor()->setARGB('FF7CAAFF');;
        $sheet->getStyle("I".($i+1))->getFont()->setBold( true );
        $sheet->getStyle("A".($i+2).":J".($i+2))->getFont()->setBold( true );
        
        $conditional1 = new \PhpOffice\PhpSpreadsheet\Style\Conditional();
        $conditional1->setConditionType(\PhpOffice\PhpSpreadsheet\Style\Conditional::CONDITION_CELLIS);
        $conditional1->setOperatorType(\PhpOffice\PhpSpreadsheet\Style\Conditional::OPERATOR_LESSTHAN);
        $conditional1->addCondition('E2');
        $conditional1->getStyle()->getFont()->getColor()->setARGB(\PhpOffice\PhpSpreadsheet\Style\Color::COLOR_RED);
        $conditional1->getStyle()->getFill()->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)->getStartColor()->setARGB('FFAF0006');
        $conditional1->getStyle()->getFill()->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)->getEndColor()->setARGB('FFAF0006');
        
        $conditional1->getStyle()->getFont()->setBold(true);
        
        $conditional2 = new \PhpOffice\PhpSpreadsheet\Style\Conditional();
        $conditional2->setConditionType(\PhpOffice\PhpSpreadsheet\Style\Conditional::CONDITION_CELLIS);
        $conditional2->setOperatorType(\PhpOffice\PhpSpreadsheet\Style\Conditional::OPERATOR_GREATERTHANOREQUAL);
        $conditional2->addCondition('E2');
        $conditional2->getStyle()->getFont()->getColor()->setARGB(\PhpOffice\PhpSpreadsheet\Style\Color::COLOR_GREEN);
        $conditional2->getStyle()->getFill()->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)->getStartColor()->setARGB('FF00903C');
        $conditional2->getStyle()->getFill()->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)->getEndColor()->setARGB('FF00903C');
        $conditional2->getStyle()->getFont()->setBold(true);
        
        $conditionalStyles = $spreadsheet->getActiveSheet()->getStyle('I'.($i+2))->getConditionalStyles();
        $conditionalStyles[] = $conditional1;
        $conditionalStyles[] = $conditional2;
        
        $sheet->getStyle('I'.($i+2))->setConditionalStyles($conditionalStyles);
        
        $sheet->mergeCells("G1:H1");
        
        foreach (range('A','J') as $col) {
           $sheet->getColumnDimension($col)->setAutoSize(true);
        }
    }
    
    // Write an .xlsx file  
    $writer = new Xlsx($spreadsheet); 
      
    // Save .xlsx file to the files directory 
    $writer->save('files/My Gradebook - '.$user.'.xlsx');
    echo trim("My Gradebook - ".$user.".xlsx");
    
} else if(isset($_POST["delete_excel"])){
    unlink($_POST["file"]);
    echo "Deleted " . $_POST["file"];
}

 


?>