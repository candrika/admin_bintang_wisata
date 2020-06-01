<?php
   /*
    * pgBackupRestore PHP Class Benchmark Example
    *   for php-cli
    *
    * usage:
    * php -q example.php          - Perform both backup and restore
    * php -q example.php backup   - Perform backup
    * php -q example.php restore  - Perform restore
    *
    */

   require("pgBackupRestore.class.php");

   // POSTGRESQL AUTH INFO
   $db_host = "localhost";
   $db_user = "imm";
   $db_pass = "imm";
   // SOURCE DATABASE (Backup)
   $source_db="aktivadb2";
   // SQL FILE TO BE CREATED
   $sql_file="my_database.sql";
   // DESTINATION DATABASE (Restore)
   $dest_db="aktivadb2";

   function timer()
   {
      $time = microtime();
      $time = explode(" ", $time);
      $time = $time[1] + $time[0];
      return($time);
   }

   switch( strtolower($argv[1]) )
   {
      case 'backup':
         $Backup = true;
         $Restore = false;
      break;
    
      case 'restore':
         $Backup = false;
         $Restore = true;
      break;

      default:
         $Backup = true;
         $Restore = true;
      break;
   }
   printf ("--[ Current Memory Limit: %s\n\n", ini_get('memory_limit'));
 
   if ($Backup)
   {
      printf ("[+] Backup of database '$source_db' in progress\n");
      $s = timer();
      $pgBackup = new pgBackupRestore($db_host, $db_user, $db_pass, $source_db);
      $pgBackup->UseDropTable = false;
      $pgBackup->Backup($sql_file);
      $e = timer();
      printf("[+] Backup took %d seconds to terminate\n\n", ($e - $s));
   }

   if ($Restore)
   {
      printf ("[+] Restore to database '$dest_db' in progress\n");
      $s = timer();
      $pgRestore = new pgBackupRestore($db_host, $db_user, $db_pass, $dest_db);
      $pgRestore->Restore($sql_file);
      $e = timer();
      printf("[+] Restore took %d seconds to terminate\n\n", ($e - $s));
   }
?>
